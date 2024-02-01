import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

import { AUTH_SERVICE_PROVIDER, AUTH_STRATEGY_PROVIDER } from '../constants';

@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: AUTH_SERVICE_PROVIDER,
      useClass: AuthService,
    },
    {
      provide: AUTH_STRATEGY_PROVIDER,
      useClass: AuthStrategy,
    },
  ],
  exports: [
    {
      provide: AUTH_SERVICE_PROVIDER,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
