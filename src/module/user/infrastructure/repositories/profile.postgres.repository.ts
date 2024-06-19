import { Inject, Injectable } from '@nestjs/common';

import { PRISMA_PROVIDER, PrismaService } from '../../../../core/providers';
import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';

import { Utils } from '../../../../core/utils';
import { IProfileRepository, Profile } from '../../domain';

@Injectable()
export class ProfilePostgresRepository implements IProfileRepository {
  constructor(
    @Inject(PRISMA_PROVIDER)
    private readonly prisma: PrismaService,
  ) {}

  public async fetch(id: string): Promise<Profile> {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  public async fetchAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  public async create(input: Partial<Profile> & { userId: string }): Promise<Profile> {
    return this.prisma.profile.create({
      data: {
        userId: input.userId,
        bio: input.bio,
        avatar: input.avatar,
      },
    });
  }

  public async update(input: Partial<Profile> & { id: string }): Promise<Profile> {
    const { id, ...data } = input;

    return this.prisma.profile.update({
      where: { id },
      data: Utils.Object.dropUndefined(data),
    });
  }

  public async search(page: number, limit: number, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<Profile>> {
    const whereConditions = params ? this.prisma.buildWhereCondition(params) : undefined;

    // Execute count and findMany queries concurrently
    const [users, total] = await Promise.all([
      this.prisma.profile.findMany({
        where: whereConditions,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order ? { [order.key]: order.dir } : undefined,
      }),
      this.prisma.profile.count({ where: whereConditions }),
    ]);

    return new SearchResult<Profile>(users, page, Math.ceil(total / limit), limit, total);
  }

  public async delete(id: string): Promise<Profile> {
    return this.prisma.profile.delete({ where: { id } });
  }
}
