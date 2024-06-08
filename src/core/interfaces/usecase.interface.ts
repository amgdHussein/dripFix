import { SearchResult } from '../shared/query';

export interface Usecase<T> {
  execute(...args: any): Promise<void | boolean | T | SearchResult<T>>;
}
