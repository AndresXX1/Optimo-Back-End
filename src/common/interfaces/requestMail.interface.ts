import { Address } from 'nodemailer/lib/mailer';

export interface IRequestMail {
  from?: Address;
  recipients: Address;
  subject: string;
  html: string;
  text?: string;
  placeHolderReplacement?: Record<string, string>;
}
