import { QueryOrder, QueryParam, SearchResult } from '../../../../core/shared/query';
import { User } from '../entities';

export interface IUserService {
  fetchUser(id: string): Promise<User>;
  fetchUsers(): Promise<User[]>;
  searchUsers(page: number, limit: number, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<User>>;
  createUser(user: Partial<User>): Promise<User>;
  createUsers(users: Partial<User>[]): Promise<User[]>;
  updateUser(users: Partial<User> & { id: string }): Promise<User>;
  updateUsers(users: (Partial<User> & { id: string })[]): Promise<User[]>;
  overwriteUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<User>;
  isUserActive(id: string): Promise<boolean>;
}
