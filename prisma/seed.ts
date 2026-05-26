import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('12345678', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@admin.com',
      cpf: '00000000000',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Seed executed: Admin user created/verified');
  console.log({ id: admin.id, email: admin.email });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
