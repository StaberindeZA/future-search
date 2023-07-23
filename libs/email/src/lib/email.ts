import 'dotenv/config';
import { createTransport } from 'nodemailer';

function getNodemailerTransport() {
  return {
    port: parseInt(process.env['MAILDEV_PORT'] as string) || 1025,
  };
}

// TODO - Turn this into class
export async function sendSearchReminderEmail({
  email,
  searchTerm,
  searchDate,
  searchCreatedDate,
}: {
  email: string;
  searchTerm: string;
  searchDate: Date;
  searchCreatedDate: Date;
}) {
  // TODO - Move this outside of function
  const transporter = createTransport(getNodemailerTransport());
  const info = await transporter.sendMail({
    from: '"Temp Test" <temptest@example.com>',
    to: email,
    subject: 'Your past You searched for something',
    text: searchTerm,
    html: `<b><h1>Your Search</h1><p>Search Term: ${searchTerm}</p><p>Search created on: ${searchCreatedDate.toISOString()}</p</b>`,
  });
  return info;
}
