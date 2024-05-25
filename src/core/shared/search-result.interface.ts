export interface SearchResult<T> {
  output: T[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}
