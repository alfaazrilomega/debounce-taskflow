const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

// Manually parse env files if process.env isn't populated
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  }
}

loadEnv();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL
    }
  }
});

const dummyAccounts = [
  {
    email: 'demo1@taskflow.test',
    password: 'Demo123456!',
    fullName: 'Demo User 1'
  },
  {
    email: 'demo2@taskflow.test',
    password: 'Demo123456!',
    fullName: 'Demo User 2'
  },
  {
    email: 'demo3@taskflow.test',
    password: 'Demo123456!',
    fullName: 'Demo User 3'
  }
];

async function seed() {
  console.log('Seeding 3 dummy verified accounts in Supabase Auth...');

  for (const acc of dummyAccounts) {
    // 1. Check if user already exists in auth.users
    const existing = await prisma.$queryRaw`
      SELECT id::text FROM auth.users WHERE LOWER(email) = LOWER(${acc.email}) LIMIT 1
    `;

    let userId;
    if (existing.length > 0) {
      userId = existing[0].id;
      console.log(`Updating existing user ${acc.email} (${userId})...`);
      await prisma.$executeRaw`
        UPDATE auth.users
        SET encrypted_password = extensions.crypt(${acc.password}, extensions.gen_salt('bf')),
            email_confirmed_at = NOW(),
            updated_at = NOW()
        WHERE id = ${userId}::uuid
      `;
    } else {
      userId = crypto.randomUUID();
      console.log(`Creating new user ${acc.email} (${userId})...`);
      await prisma.$executeRaw`
        INSERT INTO auth.users (
          id,
          instance_id,
          aud,
          role,
          email,
          encrypted_password,
          email_confirmed_at,
          raw_app_meta_data,
          raw_user_meta_data,
          created_at,
          updated_at
        ) VALUES (
          ${userId}::uuid,
          '00000000-0000-0000-0000-000000000000'::uuid,
          'authenticated',
          'authenticated',
          ${acc.email},
          extensions.crypt(${acc.password}, extensions.gen_salt('bf')),
          NOW(),
          '{"provider":"email","providers":["email"]}'::jsonb,
          '{}'::jsonb,
          NOW(),
          NOW()
        )
      `;
    }

    // 2. Upsert profile in hr_profiles
    await prisma.profile.upsert({
      where: { id: userId },
      update: { full_name: acc.fullName },
      create: {
        id: userId,
        full_name: acc.fullName
      }
    });

    // 3. Ensure user has a personal workspace
    let ownedWorkspace = await prisma.hRWorkspace.findFirst({
      where: { owner_id: userId }
    });

    if (!ownedWorkspace) {
      const slug = `demo-workspace-${acc.email.split('@')[0]}`;
      await prisma.hRWorkspace.upsert({
        where: { slug },
        update: { owner_id: userId },
        create: {
          name: `${acc.fullName}'s Workspace`,
          slug,
          owner_id: userId,
          members: {
            create: {
              user_id: userId,
              role: 'owner',
              status: 'active'
            }
          }
        }
      });
    }

    console.log(`✅ Success: ${acc.email} (Password: ${acc.password}) verified and ready.`);
  }

  console.log('\n--- DUMMY ACCOUNTS SEEDED SUCCESSFULLY ---');
}

seed()
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
