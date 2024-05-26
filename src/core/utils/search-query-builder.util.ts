import { ParamType, QueryOp, QueryParam } from '../shared';

/**
 * SearchQueryBuilder is a utility class for constructing and decoding search query parameters.
 * It provides methods for building query parameters with various operators such as equals, notEquals,
 * greaterThan, greaterThanOrEquals, lessThan, lessThanOrEquals, in, notIn, arrayContains, arrayContainsAny,
 * and between. This class also includes static methods for encoding and decoding query parameters.
 *
 * @example
 * const builder = new SearchQueryBuilder()
 *   .equals('name', 'Amgad Hussein')
 *   .in('age', [21, 22, 78])
 *   .arrayContainsAny('tags', ['sport', 'music'])
 *   .arrayContains('categories', ['books'])
 *   .lessThan('createdAt', new Date('2022-01-01T00:00:00.000Z'))
 *   .build();
 * @output 'name:eq:Amgad%20Hussein;age:in:21%2C22%2C78;tags:arcoay:sport%2Cmusic;categories:arco:books;createdAt:lt:2022-01-01T00%3A00%3A00.000Z'
 */
export class SearchQueryBuilder {
  private queryParams: QueryParam[];

  constructor() {
    this.queryParams = [];
  }

  public equals(key: string, value: ParamType): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('eq', key, value));
    return this;
  }

  public notEquals(key: string, value: ParamType): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('neq', key, value));
    return this;
  }

  public greaterThan(key: string, value: number | Date): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('gt', key, value));
    return this;
  }

  public greaterThanOrEquals(key: string, value: number | Date): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('gte', key, value));
    return this;
  }

  public lessThan(key: string, value: number | Date): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('lt', key, value));
    return this;
  }

  public lessThanOrEquals(key: string, value: number | Date): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('lte', key, value));
    return this;
  }

  public in(key: string, values: ParamType[]): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('in', key, values));
    return this;
  }

  public notIn(key: string, values: ParamType[]): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('nin', key, values));
    return this;
  }

  public arrayContains(key: string, values: ParamType[]): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('arco', key, values));
    return this;
  }

  public arrayContainsAny(key: string, values: ParamType[]): SearchQueryBuilder {
    this.queryParams.push(new QueryParam('arcoay', key, values));
    return this;
  }

  public build(): string {
    const searchFilters: string[] = this.queryParams.map(param => {
      let valueString: string;

      if (param.value instanceof Date) {
        valueString = (param.value as Date).toISOString();
      } else if (Array.isArray(param.value)) {
        valueString = (param.value as ParamType[]).map(v => (v instanceof Date ? v.toISOString() : String(v))).join(',');
      } else {
        valueString = String(param.value);
      }

      const encodedValue = encodeURIComponent(valueString);
      return `${param.key}:${param.operator}:${encodedValue}`;
    });

    return searchFilters.join(';');
  }

  public static encode(queryParams: QueryParam[]): string {
    const searchFilters: string[] = queryParams.map(param => {
      let valueString: string;

      if (param.value instanceof Date) {
        valueString = (param.value as Date).toISOString();
      } else if (Array.isArray(param.value)) {
        valueString = (param.value as ParamType[]).map(v => (v instanceof Date ? v.toISOString() : String(v))).join(',');
      } else {
        valueString = String(param.value);
      }

      const encodedValue = encodeURIComponent(valueString);
      return `${param.key}:${param.operator}:${encodedValue}`;
    });

    return searchFilters.join(';');
  }

  public static decode(queryString: string): QueryParam[] {
    if (!queryString) return [];

    return queryString.split(';').map(pair => {
      const [key, operator, encodedValue] = pair.split(':');
      // TODO: Handle incoming values that are not encoded
      const decodedValue = decodeURIComponent(encodedValue);
      //   const decodedValue = encodedValue;

      let value: ParamType;
      if (operator === 'in' || operator === 'nin' || operator === 'arco' || operator === 'arcoay') {
        value = decodedValue.split(',').map(v => (!isNaN(Number(v)) ? Number(v) : v));
      } else if (decodedValue === 'true' || decodedValue === 'false') {
        value = decodedValue === 'true';
      } else if (!isNaN(Number(decodedValue))) {
        value = Number(decodedValue);
      } else if (Date.parse(decodedValue)) {
        value = new Date(decodedValue);
      } else {
        value = decodedValue;
      }

      return new QueryParam(operator as QueryOp, key, value);
    });
  }
}
