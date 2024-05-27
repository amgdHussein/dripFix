import { Role } from '../../../../core/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
