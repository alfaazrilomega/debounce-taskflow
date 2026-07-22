const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://postgres:J7ksMRqAaw3Uach5@db.ycawgqzbognosxscgomc.supabase.co:6543/postgres?pgbouncer=true' } } });
prisma.$queryRaw`SELECT 1`.then(console.log).catch(console.error).finally(() => prisma.$disconnect());
