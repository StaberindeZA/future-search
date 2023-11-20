import Logger = require('bunyan');
import { EmailManager } from './manager';
import { buildGoogleSearch } from '@future-search/shared';

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
    const searchWithLink = `<a href=${buildGoogleSearch(searchTerm)} target="_blank" rel="noopener noreferrer">${searchTerm}</a>`;
    const result = await this.emailManager.sendMail({
      to: email,
      subject: 'Your past You searched for something',
      text: searchTerm,
      html: `<b><h1>Your Search</h1><p>Search Term: ${searchWithLink}</p><p>Search created on: ${searchCreatedDate.toDateString()} at ${searchCreatedDate.toLocaleTimeString()}</p</b>`,
    });

    return !!result
  }
}
