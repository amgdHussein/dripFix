import { SearchResult } from '../types';

export interface Usecase<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(...args: any): Promise<void | boolean | T | SearchResult<T>>;
}
