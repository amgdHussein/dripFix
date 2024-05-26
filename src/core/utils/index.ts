import * as ObjectUtils from './object.util';
import { SearchQueryBuilder as QueryBuilder } from './search-query-builder.util';
import * as StringUtils from './string.util';

export namespace Utils {
  export import Object = ObjectUtils;
  export import String = StringUtils;
  export const SearchQueryBuilder = QueryBuilder;
}
