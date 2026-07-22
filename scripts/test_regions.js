const { PrismaClient } = require('@prisma/client');
const regions = ['ap-southeast-2', 'us-east-1', 'us-west-1', 'eu-central-1', 'ap-northeast-1', 'ap-southeast-1'];

async function testRegions() {
  for (const region of regions) {
    const url = "postgresql://postgres.ycawgqzbognosxscgomc:J7ksMRqAaw3Uach5@aws-0-" + region + ".pooler.supabase.com:6543/postgres?pgbouncer=true";
    const p = new PrismaClient({ datasources: { db: { url } } });
    try {
      await p.$queryRawUnsafe("SELECT 1");
      console.log('SUCCESS REGION:', region);
      return;
    } catch (e) {
      if (e.message.includes('not found')) {
        console.log('Not found in:', region);
      } else {
        console.error('Error in:', region, e.message);
      }
    } finally {
      await p.$disconnect();
    }
  }
}
testRegions();
