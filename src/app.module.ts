import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_LOGGER } from './core/constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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

    AppService,
  ],
})
export class AppModule {}
