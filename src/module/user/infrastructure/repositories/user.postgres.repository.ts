import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_PROVIDER, PrismaService } from '../../../../core/providers';
import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';
import { Utils } from '../../../../core/utils';

import { IUserRepository, User } from '../../domain';

@Injectable()
export class UserPostgresRepository implements IUserRepository {
  constructor(
    @Inject(PRISMA_PROVIDER)
    private readonly prisma: PrismaService,
  ) {}

  public async fetch(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async create(input: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        active: input.active,
      },
    });
  }

  public async update(input: Partial<User> & { id: string }): Promise<User> {
    const { id, ...data } = input;

    return this.prisma.user.update({
      where: { id },
      data: Utils.Object.dropUndefined(data),
    });
  }

  public async search(page: number = 1, limit: number = 20, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<User>> {
    const whereConditions = params ? this.prisma.buildWhereCondition(params) : undefined;

    // Execute count and findMany queries concurrently
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereConditions,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order ? { [order.key]: order.dir } : undefined,
      }),
      this.prisma.user.count({ where: whereConditions }),
    ]);

    return new SearchResult<User>(users, page, Math.ceil(total / limit), limit, total);
  }

  public async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  public async fetchAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async updateBatch(users: (Partial<User> & { id: string })[]): Promise<User[]> {
    const updatePromises = users.map(user => {
      const { id, ...data } = user;

      return this.prisma.user.update({
        where: { id },
        data: data,
      });
    });

    return this.prisma.$transaction(updatePromises);
  }

  public async createBatch(users: Partial<User>[]): Promise<User[]> {
    const createPromises = users.map(user => {
      return this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          active: user.active,
        },
      });
    });

    return this.prisma.$transaction(createPromises);
  }
}
