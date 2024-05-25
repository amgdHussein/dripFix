export type SortDirection = 'asc' | 'desc';

export interface SearchOrder {
  field: string;
  direction: SortDirection;
}
