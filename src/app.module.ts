import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AuthModule } from './core/auth';
import { ExceptionFilter } from './core/filters';
import { AuthenticationGuard } from './core/guards';
import { LoggingInterceptor, ResponseInterceptor } from './core/interceptors';
import { FirestoreModule, HttpModule, RedisModule } from './core/providers';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      host: process.env.REDISHOST,
      port: +process.env.REDISPORT,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    AppService,
  ],
})
export class AppModule {}
