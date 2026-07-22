const { PrismaClient } = require('@prisma/client');
const url = 'postgresql://postgres:J7ksMRqAaw3Uach5@db.ycawgqzbognosxscgomc.supabase.co:5432/postgres?connection_limit=3';
const prisma = new PrismaClient({ datasources: { db: { url } } });
prisma.$queryRaw`SELECT 1`.then(() => console.log('Direct connected!')).catch(console.error).finally(() => prisma.$disconnect());
