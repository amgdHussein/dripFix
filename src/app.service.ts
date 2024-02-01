import { Inject, Injectable } from '@nestjs/common';

import { FirestoreCollectionService } from './core/providers/firestore';
import { DB_COLLECTION_PROVIDER } from './core/constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_COLLECTION_PROVIDER.USERS)
    private readonly collection: FirestoreCollectionService<{ id: string }>,
  ) {}

  public getHello(): string {
    return 'Hello World!';
  }

  public addUser(user: any): any {
    return this.collection.addDoc(user);
  }
}
