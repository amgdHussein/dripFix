import * as ObjectUtils from './object.util';
import { SearchQueryBuilder } from './search-query-builder.util';
import * as StringUtils from './string.util';

export namespace Utils {
  export import Object = ObjectUtils;
  export import String = StringUtils;
  export const QueryBuilder = SearchQueryBuilder;
}
