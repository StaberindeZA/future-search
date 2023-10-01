import { Command, Option } from 'commander';
import { PrismaClient, SearchStatus } from '@prisma/client';
import { EmailService } from '@future-search/email';
import Logger = require('bunyan');

const prisma = new PrismaClient();
const program = new Command();
const emailService = new EmailService();
const log = Logger.createLogger({ name: 'email_cron_Fetch' });

async function email_cron_fetch(data: {
  status: SearchStatus;
  startDate?: string;
  endDate?: string;
  dryRun: boolean;
}) {
  const { status, startDate, endDate, dryRun } = data;

  log.info({ data }, 'Start script');

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

  log.info(
    {
      numberOfSearches: searches.length,
    },
    searches.length ? 'Searches found' : 'No searches found'
  );

  // Send emails
  const emailsToSend = searches.map((search) => {
    return emailService.sendSearchReminderEmail({
      email: search.user.email,
      searchTerm: search.search,
      searchDate: search.searchDate,
      searchCreatedDate: search.createdAt,
    });
  });

  if (!dryRun) {
    const result = Promise.allSettled(emailsToSend);
  }

  // Update searches with 'SUCCESS' or 'ERROR'

  return 0;
}

program
  .addOption(
    new Option('-s, --status <status>', 'Fetch searches with this status')
      .choices(['NEW', 'PROCESSING', 'SUCCESS'])
      .default('NEW')
  )
  .addOption(
    new Option(
      '-sd, --startDate [datetime]',
      'Find searches after the start date'
    )
  )
  .addOption(
    new Option('-ed, --endDate [datetime]', 'Find searches before the end date')
  )
  .addOption(
    new Option(
      'd, --dryRun [boolean]',
      'Execute script as dry run. Do not send email or change search status.'
    ).default(true)
  );

program.parse();

const options = program.opts();

email_cron_fetch({
  status: options['status'],
  startDate: options['startDate'],
  endDate: options['endDate'],
  dryRun: options['dryRun'],
})
  .catch(async (err) => {
    log.error('Script failed with error', {
      error: err.toString(),
    });
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  })
  .then(async (result) => {
    log.info('Script successfully completed');
    await prisma.$disconnect();
    process.exit(result);
  });
