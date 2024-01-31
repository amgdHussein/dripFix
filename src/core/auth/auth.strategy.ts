import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { AuthService } from './auth.service';
import { AUTH_SERVICE, AUTH_STRATEGY } from '../constants';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, AUTH_STRATEGY) {
  constructor(
    @Inject(AUTH_SERVICE)
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.GCLOUD_PRIVATE_KEY,
    });
  }

  /**
   * Validates the token and returns the decoded user token information.
   * @param {string} token - The token to be validated
   * @return {Promise<DecodedIdToken | null>} The decoded user token information, or null if the user is invalid
   */
  public async validate(token: string): Promise<DecodedIdToken | null> {
    const user: DecodedIdToken = await this.authService.validateUser(token);

    if (!user) {
      return null; // Invalid user
    }

    return user; // Return user claims
  }
}
