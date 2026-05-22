import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Deletando históricos...');
  await prisma.gameHistory.deleteMany();
  console.log('Deletando jogos...');
  await prisma.game.deleteMany();
  console.log('Feito!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
