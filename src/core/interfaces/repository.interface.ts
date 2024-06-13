import { QueryOrder, QueryParam, SearchResult } from '../types';

export interface Repository<T> {
  fetch(id: string): Promise<T>;
  create(input: Partial<T>): Promise<T>;
  update(input: Partial<T> & { id: string }): Promise<T>;
  overwrite(input: T): Promise<T>;
  search(page: number, limit: number, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<T>>;
  delete(id: string): Promise<T>;
}
