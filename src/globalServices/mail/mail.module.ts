import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: 'smtp.sendgrid.net',
          secure: false,
          auth: {
            user: 'apikey',
            pass: SENDGRID_API_KEY,
          },
        },
        defaults: {
          from: `"Synchro" <${SENDGRID_EMAIL}>`,
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
