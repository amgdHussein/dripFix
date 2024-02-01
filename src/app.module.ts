import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { APP_LOGGER_PROVIDER } from './core/constants';

import { AuthModule } from './core/auth';
import { AuthenticationGuard } from './core/guards';
import { AppExceptionFilter } from './core/filters';

import { FirestoreModule } from './core/providers/firestore';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    //? Core
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule,

    FirestoreModule.forRoot({
      useFactory: () => ({
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: {
          client_email: process.env.GCLOUD_CLIENT_EMAIL,
          private_key: process.env.GCLOUD_PRIVATE_KEY,
        },
      }),
    }),
  ],

  controllers: [AppController],

  providers: [
    {
      provide: APP_LOGGER_PROVIDER,
      useClass: Logger,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AppService,
  ],
})
export class AppModule {}
