export interface QueryResponse<T> {
  data: T[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}
