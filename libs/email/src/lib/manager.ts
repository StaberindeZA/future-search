import 'dotenv/config';
import { Transporter, createTransport } from 'nodemailer';
import { SendMailData } from './types';

function getNodemailerTransport() {
  return {
    port: parseInt(process.env['MAILDEV_PORT'] as string) || 1025,
  };
}

export class EmailManager {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport(getNodemailerTransport());
  }

  async sendMail(data: SendMailData) {
    return this.transporter.sendMail(data);
  }
}
