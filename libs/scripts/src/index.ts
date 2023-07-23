import { init } from './lib/email_test';

export * from './lib/email_cron_fetch';
export * from './lib/email_test';

async function tester() {
  console.log('TEST');
  await init();

  return 0;
}

tester()
  .catch(async (err) => {
    console.error(err);
    process.exit(1);
  })
  .then(async (result) => {
    process.exit(result);
  });
