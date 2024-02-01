/* eslint-disable @typescript-eslint/no-explicit-any */

import { Settings } from '@google-cloud/firestore';

export interface FirestoreModuleOptions {
  useFactory: (
    projectId: string,
    credentials: {
      client_email: string;
      private_key: string;
    },
  ) => Settings;
  inject?: any[];
}
