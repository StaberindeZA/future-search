import 'dotenv/config';
import { Transporter, createTransport } from 'nodemailer';
import Logger = require('bunyan');
import { SendMailData } from './types';

function getNodemailerTransport() {
  const host = process.env['MAILER_HOST'];
  const port = parseInt(process.env['MAILER_PORT'] as string);
  const user = process.env['MAILER_USER'];
  const pass = process.env['MAILER_PASS'];
  const auth = user && pass ? { user, pass} : undefined;
  return {
    host,
    port,
    auth,
  };
}

export class EmailManager {
  private transporter: Transporter;
  private log: Logger;
  private fromMailAddress: string;

  constructor() {
    this.transporter = createTransport(getNodemailerTransport());
    this.log = Logger.createLogger({ name: 'MailManager', level: process.env['LOGGER_LOG_LEVEL'] as Logger.LogLevel || 'info' });
    this.fromMailAddress = process.env['MAILER_SENDER_EMAIL'] || '';
  }

  checkEmailAllowList(email: string) {
    const emailsAllowList =
      (process.env['MAILER_EMAILS_ALLOW_LIST'] as string) || '';
    const allowedEmails = emailsAllowList.split(',');
    return allowedEmails.includes(email);
  }

  async sendMail(data: SendMailData) {
    if (this.checkEmailAllowList(data.to)) {
      this.log.debug({ to: data.to }, 'sendEmail.allowed');
      return this.transporter.sendMail({
        ...data,
        from: this.fromMailAddress
      });
    } else {
      this.log.debug(
        { to: data.to },
        'sendEmail.notOnAllowList'
      );
      return false;
    }
  }
}
