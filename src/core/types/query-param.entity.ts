export type QueryOp = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'arcoay' | 'arco';

export type ParamType = string | boolean | number | Date;

export class QueryParam {
  constructor(
    public operator: QueryOp,
    public key: string,
    public value: ParamType | ParamType[],
  ) {}
}
