import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import {
  ELASTIC_MAIL_PASSWORD,
  ELASTIC_MAIL_USERNAME,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL,
} from '../../config/env.config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: 'smtp.elasticemail.com',
          port: 2525,
          auth: {
            user: ELASTIC_MAIL_USERNAME,
            pass: ELASTIC_MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"Me Protocol" <${ELASTIC_MAIL_USERNAME}>`,
        },
        template: {
          // direction in src/views/template/mail.hbs
          dir: join(__dirname, '../../../src/views/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
