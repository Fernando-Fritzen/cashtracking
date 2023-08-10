import { ReactAdapter } from '@webtre/nestjs-mailer-react-adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

const mailOptions: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  defaults: {
    from: 'cashtracking@viniengelage.com',
  },
  template: {
    dir: __dirname + '/../infra/templates',
    adapter: new ReactAdapter({
      pretty: true,
    }),
  },
};

export default mailOptions;
