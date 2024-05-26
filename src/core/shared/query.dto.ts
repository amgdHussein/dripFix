import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

import { Utils } from '../utils';
import { QueryOrder, SortDirection } from './query-order.interface';
import { ParamType, QueryOp, QueryParam } from './query-param.interface';
import { SearchResult } from './search-result.interface';

export class QueryParamDto implements QueryParam {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'key',
    type: String,
    required: true,
    example: 'displayName',
    description: 'The key field to filter by',
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
    description: 'Filter operator',
  })
  readonly operator: QueryOp;

  @IsNotEmpty()
  @ApiProperty({
    name: 'value',
    type: Object,
    required: true,
    example: 'Amgad Hussein',
    description: 'The field value',
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
    name: 'direction',
    type: String,
    required: true,
    example: 'asc',
    description: 'To sort data in ascending or descending manner',
  })
  readonly dir: SortDirection = 'asc';
}

export class QueryResultDto<T> implements SearchResult<T> {
  @ApiProperty({
    name: 'output',
    type: Array<any>,
    example: [],
    description: 'The items fetched',
  })
  output: T[];

  @ApiProperty({
    name: 'page',
    type: Number,
    example: 1,
    description: 'The current page number',
  })
  page: number;

  @ApiProperty({
    name: 'pages',
    type: Number,
    example: 5,
    description: 'The total number of pages',
  })
  pages: number;

  @ApiProperty({
    name: 'per_page',
    type: Number,
    example: 10,
    description: 'The number of items per page',
  })
  per_page: number;

  @ApiProperty({
    name: 'total',
    type: Number,
    example: 50,
    description: 'The total number of items',
  })
  total: number;
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
  page: number;

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
  limit: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Utils.SearchQueryBuilder.decode(value).map(param => plainToClass(QueryParamDto, param));
  })
  @ValidateNested({ each: true })
  @ApiProperty({
    name: 'filters',
    type: String,
    required: false,
    example: 'name:eq:Amgad Hussein',
    description: 'The sorting operation applied for current request',
  })
  params: QueryParamDto[];

  @IsOptional()
  @Transform(({ value }) => {
    const [key, direction] = value.split(':');
    return plainToClass(QueryOrderDto, { key: key.trim(), direction: direction.trim() });
  })
  @ValidateNested()
  @ApiProperty({
    name: 'orderBy',
    type: String,
    required: false,
    example: 'createdAt:desc',
    description: 'The sorting operation applied for current request',
  })
  orderBy: QueryOrderDto;
}
