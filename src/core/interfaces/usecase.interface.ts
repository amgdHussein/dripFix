import { SearchResult } from '../types';

export interface Usecase<T> {
  execute(...args: any): Promise<void | boolean | T | SearchResult<T>>;
}
