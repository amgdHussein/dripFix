import { HttpException, HttpStatus } from '@nestjs/common';

export class FirebaseAuthException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
