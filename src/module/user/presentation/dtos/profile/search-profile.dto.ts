import { ApiProperty } from '@nestjs/swagger';
import { Transform, plainToClass } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';

import { ParamType, QueryOp, QueryOrder, QueryParam, SearchResult, SortDirection } from '../../../../../core/types';
import { Utils } from '../../../../../core/utils';
import { ProfileDto } from './profile.dto';

export class ProfileQueryParamDto implements QueryParam {
  @IsIn([['id', 'userId', 'createdAt', 'updatedAt']])
  @ApiProperty({
    name: 'key',
    type: String,
    required: true,
    example: 'userId',
    description: 'The key field to query by',
  })
  readonly key: string;

  @IsIn(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'nin'])
  @ApiProperty({
    name: 'operator',
    type: String,
    required: true,
    example: 'eq',
    description: 'Query operator',
  })
  readonly operator: QueryOp;

  @ApiProperty({
    name: 'value',
    type: Object,
    required: true,
    example: 'a40d5019-d053-4477-81af-3808dbe62b31',
    description: 'The key value in database only (string, number, boolean, Date) are allowed',
  })
  readonly value: ParamType;
}

export class ProfileQueryOrderDto implements QueryOrder {
  @IsIn(['id', 'createdAt', 'updatedAt'])
  @ApiProperty({
    name: 'key',
    type: String,
    required: true,
    example: 'createdAt',
    description: 'The key field to sort by',
  })
  readonly key: string;

  @IsIn(['asc', 'desc'])
  @ApiProperty({
    name: 'dir',
    type: String,
    required: true,
    example: 'asc',
    description: 'To sort data in ascending or descending manner',
  })
  readonly dir: SortDirection;
}

export class ProfileQueryResultDto implements SearchResult<ProfileDto> {
  @ApiProperty({
    name: 'data',
    type: ProfileDto,
    example: [ProfileDto],
    description: 'The users profiles fetched',
  })
  readonly data: ProfileDto[];

  @ApiProperty({
    name: 'page',
    type: Number,
    example: 1,
    description: 'The current page number',
  })
  readonly page: number;

  @ApiProperty({
    name: 'pages',
    type: Number,
    example: 5,
    description: 'The total number of pages',
  })
  readonly pages: number;

  @ApiProperty({
    name: 'perPage',
    type: Number,
    example: 10,
    description: 'The number of users profiles per page',
  })
  readonly perPage: number;

  @ApiProperty({
    name: 'total',
    type: Number,
    example: 50,
    description: 'The total number of profiles meet the query params',
  })
  readonly total: number;
}

export class ProfileQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @ApiProperty({
    name: 'page',
    type: Number,
    required: false,
    example: 2,
    description: 'The page number to fetch data from (starting offset)',
  })
  readonly page: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @ApiProperty({
    name: 'limit',
    type: Number,
    required: false,
    example: 100,
    description: 'The number of required entities',
  })
  readonly limit: number;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Utils.QueryBuilder.decode(value).map(param => plainToClass(ProfileQueryParamDto, param));
  })
  @ValidateNested({ each: true })
  @ApiProperty({
    name: 'params',
    type: String,
    required: false,
    example: 'name:eq:Amgad Hussein',
    description: 'The sorting operation applied for current request',
  })
  readonly params: ProfileQueryParamDto[];

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    const [key, dir] = value.split(':');
    return plainToClass(ProfileQueryOrderDto, { key, dir });
  })
  @ValidateNested()
  @ApiProperty({
    name: 'order',
    type: String,
    required: false,
    example: 'createdAt:desc',
    description: 'The sorting operation applied for current request',
  })
  readonly order: ProfileQueryOrderDto;
}
