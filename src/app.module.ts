import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_LOGGER } from './core/constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './core/filters';

@Module({
  imports: [
    //? Core
    ConfigModule.forRoot({ isGlobal: true }),
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
