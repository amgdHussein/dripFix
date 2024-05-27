export interface SearchResult<T> {
  output: T[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}
