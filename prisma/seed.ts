import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Ray',
    email: 'ray@futuresearch.com',
    searches: {
      create: [
        {
          search: 'Latest graphics card',
          searchDate: new Date('2030-05-06'),
          status: 'NEW',
        },
      ],
    },
  },
  {
    name: 'P',
    email: 'p@futuresearch.com',
    searches: {
      create: [
        {
          search: 'Performance microphone',
          searchDate: new Date('2022-10-01'),
          status: 'SUCCESS',
        },
        {
          search: 'Adele tickets',
          searchDate: new Date('2030-05-06'),
          status: 'NEW',
        },
      ],
    },
  },
  {
    name: 'Sonny',
    email: 'sonny@futuresearch.com',
    searches: {
      create: [
        {
          search: 'Newest cat food',
          searchDate: new Date(),
          status: 'NEW',
        },
      ],
    },
  },
  {
    name: 'Jerry',
    email: 'jerry@futuresearch.com',
  },
];

async function main() {
  console.log('Start removing existing entries ...');
  await prisma.search.deleteMany();
  await prisma.user.deleteMany();
  console.log('Removing existing entries finished.\n');

  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
