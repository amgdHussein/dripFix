import { QueryOrder } from './query-order.interface';
import { QueryParam } from './query-param.interface';
import { SearchResult } from './search-result.interface';

export interface Repository<T> {
  fetch(id: string): Promise<T>;
  create(input: Partial<T>): Promise<T>;
  update(input: Partial<T> & { id: string }): Promise<T>;
  overwrite(input: T): Promise<T>;
  search(page: number, limit: number, params?: QueryParam[], orderBy?: QueryOrder): Promise<SearchResult<T>>;
  delete(id: string): Promise<void>;
}
