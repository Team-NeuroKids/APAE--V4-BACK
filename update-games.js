const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const games = await prisma.game.findMany();
  for (const g of games) {
    let path = g.thumbnail;
    const title = g.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (title.includes('labirinto')) path = '/images/games/labirinto.png';
    else if (title.includes('onde') || title.includes('animal')) path = '/images/games/onde-esta.png';
    else if (title.includes('memoria')) path = '/images/games/jogo-da-memoria.png';
    else if (title.includes('soletr')) path = '/images/games/soletrando.png';
    else if (title.includes('encaixe')) path = '/images/games/encaixe-de-formas.png';
    else if (title.includes('cobrin') || title.includes('tracejado')) path = '/images/games/cobrir-tracejado.png';
    else if (title.includes('quebra')) path = '/images/games/quebra-cabeca.png';
    
    await prisma.game.update({ where: { id: g.id }, data: { thumbnail: path } });
    console.log(`Updated ${g.title} to use thumbnail ${path}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
