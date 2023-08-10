import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '@modules/auth/auth.module';
import { DeviceService } from '@modules/device/device.service';

import mailConfig from '@config/mail';
import jwtConfig from '@config/jwt';

import { PrismaModule } from '@infra/prisma';
import { UserModule } from '@modules/user';
import { DeviceModule } from '@modules/device';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    MailerModule.forRoot(mailConfig),
    JwtModule.register(jwtConfig),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'public'),
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    DeviceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
