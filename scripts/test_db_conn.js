const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

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

async function testConnection(name, url) {
  console.log(`Testing connection [${name}]: ${url.replace(/:[^:@]+@/, ':****@')}`);
  const client = new PrismaClient({
    datasources: { db: { url } },
    log: ['error']
  });

  try {
    const res = await client.$queryRaw`SELECT 1 as result`;
    console.log(`✅ [${name}] SUCCESS:`, res);
    return true;
  } catch (err) {
    console.error(`❌ [${name}] ERROR:`, err.message);
    return false;
  } finally {
    await client.$disconnect();
  }
}

async function run() {
  console.log('--- DB CONNECTION DIAGNOSTICS ---');

  // Test 1: Current DATABASE_URL (Port 6543 with pgbouncer=true)
  await testConnection('DATABASE_URL (Port 6543)', process.env.DATABASE_URL);

  // Test 2: DIRECT_URL (Port 5432)
  await testConnection('DIRECT_URL (Port 5432)', process.env.DIRECT_URL);

  // Test 3: Port 6543 with connection_limit=10 & pgbouncer=true
  const urlWithConnLimit = `${process.env.DATABASE_URL}&connection_limit=10`;
  await testConnection('Port 6543 + connection_limit=10', urlWithConnLimit);

  // Test 4: Direct DB host db.pbbnhgjftmktxhjemrih.supabase.co:5432 if pooler fails
  const directDbHostUrl = `postgresql://postgres.pbbnhgjftmktxhjemrih:PRIASOLONOMOR1@db.pbbnhgjftmktxhjemrih.supabase.co:5432/postgres`;
  await testConnection('Direct Host db.pbbnhgjftmktxhjemrih.supabase.co:5432', directDbHostUrl);
}

run();
