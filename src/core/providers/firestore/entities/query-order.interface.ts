export interface QueryOrder {
  field: string;
  direction: SortDirection;
}

export enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
