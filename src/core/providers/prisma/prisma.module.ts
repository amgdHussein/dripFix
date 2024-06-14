import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const PRISMA_PROVIDER = 'PRISMA_PROVIDER';

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_PROVIDER,
      useClass: PrismaService,
    },
  ],
  exports: [PRISMA_PROVIDER],
})
export class PrismaModule {}
