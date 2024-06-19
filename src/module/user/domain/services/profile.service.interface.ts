import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';
import { Profile } from '../entities';

export interface IProfileService {
  fetchProfile(id: string): Promise<Profile>;
  fetchProfiles(): Promise<Profile[]>;
  fetchUserProfile(userId: string): Promise<Profile>;
  createProfile(profile: Partial<Profile> & { userId: string }): Promise<Profile>;
  searchProfiles(page: number, limit: number, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<Profile>>;
  updateProfile(profiles: Partial<Profile> & { id: string }): Promise<Profile>;
  deleteProfile(id: string): Promise<Profile>;
}
