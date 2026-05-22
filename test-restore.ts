import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Criando jogo de teste...');
  const game = await prisma.game.create({
    data: {
      title: 'Jogo Teste',
      description: 'Teste',
      deleted_at: new Date(), // Already "deactivated"
    }
  });

  console.log('Restaurando jogo...');
  const restored = await prisma.game.update({
    where: { id: game.id },
    data: { deleted_at: null }
  });

  console.log('Status após restaurar:', restored.deleted_at);

  await prisma.game.delete({ where: { id: game.id }});
}

main().catch(console.error).finally(() => prisma.$disconnect());
