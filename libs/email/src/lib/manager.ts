import 'dotenv/config';
import { Transporter, createTransport } from 'nodemailer';
import Logger = require('bunyan');
import { SendMailData } from './types';

function getNodemailerTransport() {
  return {
    port: parseInt(process.env['MAILDEV_PORT'] as string) || 1025,
  };
}

export class EmailManager {
  private transporter: Transporter;
  private log: Logger;

  constructor() {
    this.transporter = createTransport(getNodemailerTransport());
    this.log = Logger.createLogger({ name: 'MailManager', level: 'debug' });
  }

  checkEmailAllowList(email: string) {
    const emailsAllowList =
      (process.env['MAILER_EMAILS_ALLOW_LIST'] as string) || '';
    const allowedEmails = emailsAllowList.split(',');
    return allowedEmails.includes(email);
  }

  async sendMail(data: SendMailData) {
    if (this.checkEmailAllowList(data.to)) {
      this.log.debug({ to: data.to, from: data.from }, 'sendEmail');
      return this.transporter.sendMail(data);
    } else {
      this.log.debug(
        { to: data.to, from: data.from },
        'sendEmail.notOnAllowList'
      );
      return false;
    }
  }
}
