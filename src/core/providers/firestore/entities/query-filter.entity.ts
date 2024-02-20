import { WhereFilterOp as FilterOperator } from '@google-cloud/firestore';

export { FilterOperator };

export interface QueryFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}
