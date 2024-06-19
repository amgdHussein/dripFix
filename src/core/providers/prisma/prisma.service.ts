import { BadRequestException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { QueryParam } from '../../types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  public buildWhereCondition(params: QueryParam[]): unknown {
    return params.reduce((conditions, param) => {
      const { operator, key, value } = param;

      switch (operator) {
        case 'eq':
          conditions[key] = value;
          break;
        case 'neq':
          conditions[key] = { not: value };
          break;
        case 'gt':
          conditions[key] = { gt: value };
          break;
        case 'gte':
          conditions[key] = { gte: value };
          break;
        case 'lt':
          conditions[key] = { lt: value };
          break;
        case 'lte':
          conditions[key] = { lte: value };
          break;
        case 'in':
          conditions[key] = { in: value };
          break;
        case 'nin':
          conditions[key] = { notIn: value };
          break;
        default:
          throw new BadRequestException(`Unsupported operator: ${operator}`);
      }

      return conditions;
    }, {});
  }
}
