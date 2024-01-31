import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_FILTER } from '@nestjs/core';
import { APP_LOGGER } from './core/constants';

import { AppExceptionFilter } from './core/filters';
import { AuthModule } from './core/auth';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    //? Core
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_LOGGER,
      useClass: Logger,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
