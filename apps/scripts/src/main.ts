import { Command, Option } from 'commander';
import { PrismaClient, SearchStatus } from '@prisma/client';
import { sendSearchReminderEmail } from '@future-search/email';

async function email_cron_fetch({
  status,
  startDate,
  endDate,
}: {
  status: SearchStatus;
  startDate?: string;
  endDate?: string;
}) {
  // Query DB, using prisma, with date range and transaction types
  const searches = await prisma.search.findMany({
    where: {
      status,
      searchDate: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
    orderBy: {
      searchDate: 'asc',
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  // searches.forEach((search) => {
  //   const { search: searchString, searchDate, status, createdAt } = search;
  //   console.log({ searchString, status, searchDate, createdAt });
  // });
  console.log(searches[0]);
  // Send emails

  const emailsToSend = searches.map((search) => {
    return sendSearchReminderEmail({
      email: search.user.email,
      searchTerm: search.search,
      searchDate: search.searchDate,
      searchCreatedDate: search.createdAt,
    });
  });

  const result = Promise.allSettled(emailsToSend);

  // Update searches with 'SUCCESS' or 'ERROR'

  return 0;
}

const prisma = new PrismaClient();
const program = new Command();

program
  .addOption(
    new Option('-s, --status <status>', 'Fetch searches with this status')
      .choices(['NEW', 'PROCESSING', 'SUCCESS'])
      .default('NEW')
  )
  .addOption(
    new Option(
      '-d, --startDate [datetime]',
      'Find searches after the start date'
    )
  )
  .addOption(
    new Option('-e, --endDate [datetime]', 'Find searches before the end date')
  );

program.parse();

const options = program.opts();

email_cron_fetch({
  status: options['status'],
  startDate: options['startDate'],
  endDate: options['endDate'],
})
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  })
  .then(async (result) => {
    await prisma.$disconnect();
    process.exit(result);
  });
