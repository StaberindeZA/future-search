import { Command, Option } from 'commander';
import { PrismaClient, SearchStatus } from '@prisma/client';
import { EmailService } from '@future-search/email';
import Logger = require('bunyan');

const prisma = new PrismaClient();
const program = new Command();
const emailService = new EmailService();
const log = Logger.createLogger({ name: 'email_cron_fetch' });

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

  if (!dryRun) {
    // TODO - Add handler Class that calls email/push notification/etc.
    // Send emails
    const emailsToSend = searches.map((search) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await emailService.sendSearchReminderEmail({
            email: search.user.email,
            searchTerm: search.search,
            searchDate: search.searchDate,
            searchCreatedDate: search.createdAt,
          });

          await prisma.search.update({
            where: {
              id: search.id,
            },
            data: {
              status: 'SUCCESS'
            }
          });
          resolve({ searchId: search.id, result })
        } catch (error) {
          error.searchId = search.id;
          reject(error);
        }
      })
    });
    const results = await Promise.allSettled(emailsToSend);
    results.forEach((result) => {
      if (result.status === 'rejected') {
        log.error({ reason: result.reason.message, searchId: result.reason.searchId, error: result.reason.stack}, 'Failed to send email!');
      }
    })
  }

  // Update searches with 'SUCCESS' or 'ERROR'

  return 0;
}

const currentDate = new Date();
const defaultCurrentDate = currentDate.toISOString();
const currentDateMinusHour = new Date(new Date().setHours(currentDate.getHours() - 1)).toISOString();

program
  .addOption(
    new Option('-s, --status <status>', 'Fetch searches with this status').choices(['NEW', 'PROCESSING', 'SUCCESS']).default('NEW')
  )
  .addOption(
    new Option(
      '-sd, --startDate [datetime]',
      'Find searches after the start date'
    ).default(currentDateMinusHour)
  )
  .addOption(
    new Option('-ed, --endDate [datetime]', 'Find searches before the end date').default(defaultCurrentDate)
  )
  .addOption(
    new Option(
      '-d, --dryRun [boolean]',
      'Execute script as dry run. Do not send email or change search status.'
    ).default(true)
  );

program.parse();

const options = program.opts();
const dryRun = options['dryRun'] === 'false' ? false : !!options['dryRun'];

email_cron_fetch({
  status: options['status'],
  startDate: options['startDate'],
  endDate: options['endDate'],
  dryRun: dryRun,
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
