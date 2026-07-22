const { PrismaClient } = require('@prisma/client');
const url = 'postgresql://postgres.pbbnhgjftmktxhjemrih:J7ksMRqAaw3Uach5@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';
const prisma = new PrismaClient({ datasources: { db: { url } } });
prisma.$queryRaw`SELECT 1`.then(() => console.log('Pooler connected!')).catch(console.error).finally(() => prisma.$disconnect());
