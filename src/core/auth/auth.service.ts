import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Role } from '../constants';
import { FirebaseAuthException } from './auth.exception';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);
  private app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.GCLOUD_PROJECT_ID,
        clientEmail: process.env.GCLOUD_CLIENT_EMAIL,
        privateKey: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'), // handle multiline private key
      }),
    });
  }

  /**
   * Validate the user's token and return the decoded ID token.
   * @param {string} token - the user's token to be validated
   * @return {Promise<DecodedIdToken>} the decoded ID token
   */
  public async validateUser(token: string): Promise<DecodedIdToken> {
    try {
      const claims = await this.app.auth().verifyIdToken(token, true);
      if (!claims.email_verified) {
        this.logger.warn('Unverified user, please verify your email!');
        throw new FirebaseAuthException('Unverified user, please verify your email!');
      }
      return claims;
    } catch (error) {
      this.logger.error('User not authenticated!', error.stack);
      throw new FirebaseAuthException('User not authenticated!');
    }
  }

  /**
   * Validates if the user has the required roles.
   * @param {Role[]} userRoles - The roles of the user
   * @param {Role[]} requiredRoles - The required roles
   * @return {boolean} Whether the user has the required roles
   */
  public validateUserRole(userRoles: Role[], requiredRoles: Role[]): boolean {
    if (!userRoles || !requiredRoles) {
      this.logger.error('User roles or required roles are missing!');
      throw new ForbiddenException('User roles or required roles are missing!');
    }

    const hasRole = userRoles.some(role => requiredRoles.includes(role));

    if (userRoles.length === 0 || !hasRole) {
      this.logger.warn('User does not have required roles!');
      throw new ForbiddenException('User does not have required roles!');
    }

    return hasRole;
  }
}
