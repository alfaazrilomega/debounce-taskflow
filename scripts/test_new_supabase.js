const { PrismaClient } = require('@prisma/client');

async function testUrl(label, url) {
  console.log(`Testing [${label}]: ${url.replace(/:[^:@]+@/, ':****@')}`);
  const client = new PrismaClient({
    datasources: { db: { url } },
    log: ['error']
  });

  try {
    const res = await client.$queryRaw`SELECT 1 as result`;
    console.log(`✅ [${label}] SUCCESS:`, res);
    return true;
  } catch (err) {
    console.error(`❌ [${label}] ERROR:`, err.message);
    return false;
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const pwd = 'J7ksMRqAaw3Uach5';
  const ref = 'ycawgqzbognosxscgomc';

  // 1. Direct host
  await testUrl('Direct DB host db.ycawgqzbognosxscgomc.supabase.co:5432', `postgresql://postgres:${pwd}@db.${ref}.supabase.co:5432/postgres`);

  // 2. Pooler aws-1-ap-southeast-1.pooler.supabase.com:6543
  await testUrl('Pooler aws-1 (6543)', `postgresql://postgres.${ref}:${pwd}@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20`);

  // 3. Pooler aws-0-ap-southeast-1.pooler.supabase.com:6543
  await testUrl('Pooler aws-0 (6543)', `postgresql://postgres.${ref}:${pwd}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20`);

  // 4. Pooler aws-1-ap-southeast-1.pooler.supabase.com:5432
  await testUrl('Pooler aws-1 (5432)', `postgresql://postgres.${ref}:${pwd}@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`);
}

main();
