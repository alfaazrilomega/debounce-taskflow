const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultTags = [
  { name: 'Bug', color_code: '#ef4444' }, // red-500
  { name: 'Feature', color_code: '#3b82f6' }, // blue-500
  { name: 'Urgent', color_code: '#f97316' }, // orange-500
  { name: 'Design', color_code: '#8b5cf6' }, // violet-500
  { name: 'Backend', color_code: '#10b981' } // emerald-500
];

async function main() {
  console.log('Seeding default tags...');
  for (const tag of defaultTags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: { color_code: tag.color_code },
      create: {
        name: tag.name,
        color_code: tag.color_code
      }
    });
  }
  console.log('Tags seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
