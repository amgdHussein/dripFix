import { Firestore } from '@google-cloud/firestore';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { FIRESTORE_PROVIDER } from '../../constants';

interface FirestoreOptions {
  projectId: string;
  credentials: {
    client_email: string;
    private_key: string;
  };
}

@Module({})
export class FirestoreModule {
  /**
   * Create a Firestore module with the given options.
   * @param {FirestoreOptions} options - the options for the Firestore module
   * @return {DynamicModule} the created dynamic module
   */
  public static forRoot(options: FirestoreOptions): DynamicModule {
    const databaseProvider: Provider = {
      provide: FIRESTORE_PROVIDER,
      useFactory: (): Firestore => new Firestore(options),
    };

    const targetModule: DynamicModule = {
      global: true,
      module: FirestoreModule,
      providers: [databaseProvider],
      exports: [databaseProvider],
    };

    return targetModule;
  }
}
