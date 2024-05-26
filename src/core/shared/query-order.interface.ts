export type SortDirection = 'asc' | 'desc';

export interface QueryOrder {
  key: string;
  dir: SortDirection;
}
