import { CollectionReference, DocumentData, Firestore, Settings } from '@google-cloud/firestore';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { DB_COLLECTION_PROVIDER, DB_OPTIONS_PROVIDER, DB_PROVIDER } from '../../constants';

import { FirestoreModuleOptions } from './firestore.config';
import { FirestoreService } from './firestore.service';

@Module({})
export class FirestoreModule {
  /**
   * Create a Firestore module with the given options.
   * @param {FirestoreModuleOptions} options - the options for the Firestore module
   * @return {DynamicModule} the created dynamic module
   */
  public static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: DB_OPTIONS_PROVIDER,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const databaseProvider: Provider = {
      provide: DB_PROVIDER,
      useFactory: (config: Settings): Firestore => new Firestore(config),
      inject: [DB_OPTIONS_PROVIDER],
    };

    // Create provider for each collection, and inject them into any server by their names
    const collectionProviders: Provider[] = Object.values(DB_COLLECTION_PROVIDER).map((collectionProvider: string): Provider => {
      return {
        provide: collectionProvider,
        useFactory: <T>(database: Firestore): FirestoreService<T & { id: string }> => {
          const collection = database.collection(collectionProvider) as CollectionReference<T & { id: string }, DocumentData>;
          return new FirestoreService(collection);
        },
        inject: [DB_PROVIDER],
      };
    });

    const targetModule: DynamicModule = {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionsProvider, databaseProvider, ...collectionProviders],
      exports: [databaseProvider, ...collectionProviders],
    };

    return targetModule;
  }
}
