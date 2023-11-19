import Logger = require('bunyan');
import { EmailManager } from './manager';

export class EmailService {
  emailManager: EmailManager;
  log: Logger;

  constructor(log?: Logger) {
    this.log = log || Logger.createLogger({ name: 'MailService', level: process.env['LOGGER_LOG_LEVEL'] as Logger.LogLevel || 'info' });
    this.emailManager = new EmailManager();
  }

  async sendSearchReminderEmail(data: {
    email: string;
    searchTerm: string;
    searchDate: Date;
    searchCreatedDate: Date;
  }) {
    const { email, searchTerm, searchCreatedDate } = data;
    this.log.debug({ name: 'sendSearchReminderEmail', data });
    const result = await this.emailManager.sendMail({
      from: '"Temp Test" <temptest@example.com>',
      to: email,
      subject: 'Your past You searched for something',
      text: searchTerm,
      html: `<b><h1>Your Search</h1><p>Search Term: ${searchTerm}</p><p>Search created on: ${searchCreatedDate.toISOString()}</p</b>`,
    });

    return !!result
  }
}
