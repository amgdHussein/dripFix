import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from './core/decorators';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('/test')
  public setNewUser(@Body() user: any): any {
    return this.appService.addUser(user);
  }
}
