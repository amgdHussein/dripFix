import { QueryOrder, QueryParam, SearchResult } from '../../../../core/shared';
import { User } from '../entities';

export interface IUserService {
  fetchUser(id: string): Promise<User>;
  fetchUsers(): Promise<User[]>;
  searchUsers(page?: number, limit?: number, params?: QueryParam[], orderBy?: QueryOrder): Promise<SearchResult<User>>;
  createUser(user: Partial<User>): Promise<User>;
  createUsers(users: Partial<User>[]): Promise<User[]>;
  updateUser(users: Partial<User> & { id: string }): Promise<User>;
  updateUsers(users: (Partial<User> & { id: string })[]): Promise<User[]>;
  overwriteUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
  isUserActive(id: string): Promise<boolean>;
}
