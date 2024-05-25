export type FilterOp = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin';
// export type FilterOp = '==' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not-in' | 'array-contains-any' | 'array-contains';

export interface SearchFilter {
  field: string;
  operator: FilterOp;
  value: unknown;
}
