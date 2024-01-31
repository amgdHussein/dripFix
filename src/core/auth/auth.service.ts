import { Injectable } from '@nestjs/common';

import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { UnauthorizedException } from '../exceptions';

@Injectable()
export class AuthService {
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: String(process.env.GCLOUD_PROJECT_ID),
        clientEmail: String(process.env.GCLOUD_CLIENT_EMAIL),
        privateKey: String(process.env.GCLOUD_PRIVATE_KEY),
      }),
    });
  }

  /**
   * Validate the user's token and return the decoded ID token.
   * @param {string} token - the user's token to be validated
   * @return {Promise<DecodedIdToken>} the decoded ID token
   */
  public async validateUser(token: string): Promise<DecodedIdToken> {
    return await this.app
      .auth()
      .verifyIdToken(token, true)
      .then(claims => {
        if (claims.email_verified) return claims;

        throw new UnauthorizedException('Unverified user!');
      })
      .catch(() => {
        // this.logger.error(error);
        throw new UnauthorizedException('User not authenticated!');
      });
  }
}
