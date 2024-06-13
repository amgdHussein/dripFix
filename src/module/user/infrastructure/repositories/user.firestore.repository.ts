import { Firestore } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';

import { DB_PROVIDER, FIRESTORE_PROVIDER } from '../../../../core/constants';
import { FirestoreService } from '../../../../core/providers';
import { QueryOrder, QueryParam, SearchResult } from '../../../../core/types';

import { IUserRepository, User } from '../../domain';

@Injectable()
export class UserFirebaseRepository implements IUserRepository {
  private readonly userCollection = new FirestoreService<User>(this.firestore, DB_PROVIDER.USERS);

  constructor(
    @Inject(FIRESTORE_PROVIDER)
    private readonly firestore: Firestore,
  ) {}

  public async fetch(id: string): Promise<User> {
    return this.userCollection.getDoc(id);
  }

  public async create(user: Partial<User>): Promise<User> {
    return this.userCollection.addDoc(user);
  }

  public async update(user: Partial<User> & { id: string }): Promise<User> {
    return this.userCollection.updateDoc(user);
  }

  public async overwrite(user: User): Promise<User> {
    return this.userCollection.setDoc(user);
  }

  public async search(page: number = 1, limit: number = 20, params?: QueryParam[], order?: QueryOrder): Promise<SearchResult<User>> {
    return this.userCollection.query(page, limit, params, order);
  }

  public async delete(id: string): Promise<User> {
    return await this.userCollection.deleteDoc(id);
  }

  public async fetchAll(): Promise<User[]> {
    return this.userCollection.getDocs();
  }

  public async updateBatch(users: (Partial<User> & { id: string })[]): Promise<User[]> {
    return this.userCollection.updateDocs(users);
  }

  public async createBatch(users: Partial<User>[]): Promise<User[]> {
    return this.userCollection.setDocs(users);
  }
}
