import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateMailDto } from './dto/create-mail.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configServices: ConfigService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: this.configServices.get<string>('MAIL_HOST'),
      port: this.configServices.get<string>('MAIL_PORT'),
      secure: true,
      auth: {
        user: this.configServices.get<string>('MAIL_USER'),
        pass: this.configServices.get<string>('MAIL_PASS'),
      },
    } as nodemailer.TransportOptions);
    return transporter;
  }
  async sendEmail(createEmail: CreateMailDto) {
    const { html, from, text, recipients, subject, placeHolderReplacement } =
      createEmail;
    const transport = this.mailTransport();
    const options: Mail.Options = {
      from:
        from ??
        `${this.configServices.get<string>('APP_NAME')} <${this.configServices.get<string>('DEFAULT_MAIL_FROM')}>`,
      to: recipients,
      subject: subject,
      html: html,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
