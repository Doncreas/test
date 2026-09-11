import { PointsTier, PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Test1234!', 12);

  const user = await prisma.user.upsert({
    where: { email: 'test@kaributanzania.com' },
    update: {
      name: 'Test User',
      passwordHash,
      role: UserRole.rider,
    },
    create: {
      email: 'test@kaributanzania.com',
      name: 'Test User',
      passwordHash,
      role: UserRole.rider,
    },
  });

  await prisma.wallet.upsert({
    where: { userId: user.id },
    update: { balanceTzs: 50000 },
    create: {
      userId: user.id,
      balanceTzs: 50000,
    },
  });

  await prisma.userPoints.upsert({
    where: { userId: user.id },
    update: {
      balance: 1000,
      tier: PointsTier.bronze,
      lifetimeEarned: 1000,
    },
    create: {
      userId: user.id,
      balance: 1000,
      tier: PointsTier.bronze,
      lifetimeEarned: 1000,
    },
  });

  console.log(`Seeded test user: ${user.email} with wallet and points balances`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
