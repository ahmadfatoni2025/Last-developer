import bcrypt from 'bcryptjs';
import prisma from './client';
import { logger } from '../utils/logger';

async function seed() {
  logger.info('🌱 Seeding database...');

  // ─── Admin User ──────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@lazdev.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: 'Admin lazDev',
        email: adminEmail,
        password: hashed,
        role: 'ADMIN',
      },
    });
    logger.info(`✅ Admin created: ${adminEmail}`);
  } else {
    logger.info('ℹ️  Admin already exists, skipping');
  }

  // ─── Default Categories ──────────────────────────
  const categories = [
    { name: 'Technology', slug: 'technology', description: 'Artikel teknologi' },
    { name: 'Tutorial', slug: 'tutorial', description: 'Panduan langkah demi langkah' },
    { name: 'News', slug: 'news', description: 'Berita terbaru' },
    { name: 'Company', slug: 'company', description: 'Update dari lazDev' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  logger.info(`✅ ${categories.length} categories seeded`);

  // ─── Default Tags ────────────────────────────────
  const tags = [
    { name: 'React', slug: 'react' },
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'MySQL', slug: 'mysql' },
    { name: 'Express', slug: 'express' },
    { name: 'Prisma', slug: 'prisma' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  logger.info(`✅ ${tags.length} tags seeded`);

  logger.info('🎉 Seeding complete!');
}

seed()
  .catch((e) => {
    logger.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
