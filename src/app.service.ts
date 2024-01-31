import { Injectable } from '@nestjs/common';
import { NotFoundException } from './core/exceptions';

@Injectable()
export class AppService {
  public getHello(): string {
    throw new NotFoundException('Hello World!');
  }
}
