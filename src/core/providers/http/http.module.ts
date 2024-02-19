import { Module, DynamicModule, Provider } from '@nestjs/common';
import { HttpModule as NestHttpModule, HttpModuleAsyncOptions, HttpService } from '@nestjs/axios';

import { HTTP_PROVIDER } from '../../constants';

@Module({})
export class HttpModule {
  public static forRoot(options: HttpModuleAsyncOptions): DynamicModule {
    const httpProvider: Provider = {
      provide: HTTP_PROVIDER,
      useFactory: (): HttpService => new HttpService(),
    };

    const targetModule: DynamicModule = {
      global: true,
      imports: [NestHttpModule.registerAsync(options)],
      providers: [httpProvider],
      exports: [httpProvider],
      module: HttpModule,
    };

    return targetModule;
  }
}
