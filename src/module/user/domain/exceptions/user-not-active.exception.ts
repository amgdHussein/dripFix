import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotActiveException extends HttpException {
  constructor(id: string) {
    super('Bad Request Exception', HttpStatus.BAD_REQUEST, {
      cause: `User with id (${id}) is not active!`,
    });
  }
}
