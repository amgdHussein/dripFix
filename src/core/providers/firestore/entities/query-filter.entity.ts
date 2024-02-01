/* eslint-disable @typescript-eslint/no-explicit-any */

import { WhereFilterOp } from '@google-cloud/firestore';

export interface QueryFilter {
  field: string;
  operator: WhereFilterOp;
  value: any;
}
