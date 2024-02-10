import { Injectable } from '@nestjs/common';

import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { UnauthorizedException } from '../exceptions';
import { Role } from '../constants';

@Injectable()
export class AuthService {
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.GCLOUD_PROJECT_ID,
        clientEmail: process.env.GCLOUD_CLIENT_EMAIL,
        privateKey: process.env.GCLOUD_PRIVATE_KEY,
      }),
    });
  }

  /**
   * Validate the user's token and return the decoded ID token.
   * @param {string} token - the user's token to be validated
   * @return {Promise<DecodedIdToken>} the decoded ID token
   */
  public async validateUser(token: string): Promise<DecodedIdToken> {
    const claims = await this.app
      .auth()
      .verifyIdToken(token, true)
      .catch(error => {
        console.log('🚀 ~ AuthService ~ validateUser ~ error:', error);
        throw new UnauthorizedException('User not authenticated!');
      });

    if (claims.email_verified) return claims;
    throw new UnauthorizedException('Unverified user, please verify your email!');
  }

  /**
   * Validates if the user has the required roles.
   * @param {Role[]} userRoles - The roles of the user
   * @param {Role[]} requiredRoles - The required roles
   * @return {boolean} Whether the user has the required roles
   */
  public validateUserRole(userRoles: Role[], requiredRoles: Role[]): boolean {
    const hasRole = userRoles.some(role => requiredRoles.includes(role));

    if (userRoles.length === 0 && !hasRole) {
      throw new UnauthorizedException('User does not have required roles!');
    }

    return hasRole;
  }
}
