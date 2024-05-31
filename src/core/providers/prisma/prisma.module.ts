import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const PRISMA_PROVIDER = 'PRISMA_PROVIDER';

@Module({})
export class PrismaModule {
  public static forRoot(): DynamicModule {
    const prismaProvider: Provider = {
      provide: PRISMA_PROVIDER,
      useClass: PrismaService,
    };

    const targetModule: DynamicModule = {
      global: true,
      imports: [],
      providers: [prismaProvider],
      exports: [prismaProvider],
      module: PrismaModule,
    };

    return targetModule;
  }
}
