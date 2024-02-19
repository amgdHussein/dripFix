import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { LOGGER_PROVIDER } from './core/constants';

import { AuthModule } from './core/auth';
import { AuthenticationGuard } from './core/guards';
import { AppExceptionFilter } from './core/filters';

import { HttpModule, RedisModule, FirestoreModule } from './core/providers';

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

    RedisModule.forRoot({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),

    HttpModule.forRoot({
      useFactory: () => ({
        timeout: +process.env.HTTP_TIMEOUT,
        maxRedirects: +process.env.HTTP_MAX_REDIRECTS,
      }),
    }),
  ],

  controllers: [AppController],

  providers: [
    {
      provide: LOGGER_PROVIDER,
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
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        disableErrorMessages: false,
        whitelist: true,
        transform: true,
      }),
    },
    AppService,
  ],
})
export class AppModule {}
