import { Repository } from '../../../../core/shared';
import { User } from '../entities';

export interface IUserRepository extends Repository<User> {
  fetchAll(): Promise<User[]>;
  updateBatch(Users: (Partial<User> & { id: string })[]): Promise<User[]>;
  createBatch(Users: Partial<User>[]): Promise<User[]>;
}
