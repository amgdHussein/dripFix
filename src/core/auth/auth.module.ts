import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

import { AUTH_SERVICE, AUTH_STRATEGY } from '../constants';

@Module({
  imports: [PassportModule],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: AUTH_STRATEGY,
      useClass: AuthStrategy,
    },
  ],
  exports: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
