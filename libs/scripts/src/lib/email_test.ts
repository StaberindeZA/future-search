import { sendSearchReminderEmail } from '@future-search/email';

export async function init() {
  const info = await sendSearchReminderEmail({
    email: 'test@example.com',
    searchTerm: 'Just testing that search is OK',
    searchDate: new Date(),
    searchCreatedDate: new Date('2023-05-01'),
  });

  console.log(info);

  return 0;
}

if (require.main === module) {
  init()
    .catch(async (err) => {
      console.error(err);
      process.exit(1);
    })
    .then(async (result) => {
      process.exit(result);
    });
}
