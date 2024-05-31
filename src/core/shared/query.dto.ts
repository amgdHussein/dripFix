import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import { Utils } from '../utils';
import { QueryOrder, SortDirection } from './query-order.interface';
import { ParamType, QueryOp, QueryParam } from './query-param.interface';
import { SearchResult } from './search-result.interface';

export class QueryParamDto implements QueryParam {
  // TODO: CHECK IF THE KEY EXIST IN CLASS (USER, PROFILE, ...)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'key',
    type: String,
    required: true,
    example: 'displayName',
    description: 'The key field to query by',
  })
  readonly key: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'arcoay', 'arco'])
  @ApiProperty({
    name: 'operator',
    type: String,
    required: true,
    example: 'eq',
    description: 'Query operator',
  })
  readonly operator: QueryOp;

  @IsNotEmpty()
  @ApiProperty({
    name: 'value',
    type: Object,
    required: true,
    example: 'Amgad Hussein',
    description: 'The key value in database',
  })
  readonly value: ParamType;
}

export class QueryOrderDto implements QueryOrder {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'key',
    type: String,
    required: true,
    example: 'createdAt',
    description: 'The key field to sort by',
  })
  readonly key: string;

  @IsOptional()
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

export class QueryResultDto<T> implements SearchResult<T> {
  @ApiProperty({
    name: 'output',
    type: Array<T>,
    // example: [],
    description: 'The items fetched',
  })
  readonly output: T[];

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
    description: 'The number of items per page',
  })
  readonly perPage: number;

  @ApiProperty({
    name: 'total',
    type: Number,
    example: 50,
    description: 'The total number of items',
  })
  readonly total: number;
}

export class QueryDto {
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
  readonly page?: number;

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
  readonly limit?: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Utils.QueryBuilder.decode(value).map(param => plainToClass(QueryParamDto, param));
  })
  @ValidateNested({ each: true })
  @ApiProperty({
    name: 'params',
    type: String,
    required: false,
    example: 'name:eq:Amgad Hussein',
    description: 'The sorting operation applied for current request',
  })
  readonly params?: QueryParamDto[];

  @IsOptional()
  @Transform(({ value }) => {
    const [key, dir] = value.split(':');
    return plainToClass(QueryOrderDto, { key, dir });
  })
  @ValidateNested()
  @ApiProperty({
    name: 'order',
    type: String,
    required: false,
    example: 'createdAt:desc',
    description: 'The sorting operation applied for current request',
  })
  readonly order?: QueryOrderDto;
}
