import { Repository } from '../../../../core/interfaces';

import { Profile } from '../entities';

export interface IProfileRepository extends Repository<Profile> {
  fetchAll(): Promise<Profile[]>;
  create(input: Partial<Profile> & { userId: string }): Promise<Profile>;
}
