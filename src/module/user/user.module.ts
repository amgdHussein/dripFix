import { Module } from '@nestjs/common';

import {
  ActivateUser,
  CreateProfile,
  CreateUser,
  DeleteUser,
  FetchProfile,
  FetchUser,
  FetchUserProfile,
  IsUserActiveConstraint,
  IsUserExistConstraint,
  IsUserNotHasProfileConstraint,
  SearchProfiles,
  SearchUsers,
  UpdateProfile,
  UpdateUser,
} from './application';
import {
  PROFILE_REPOSITORY_PROVIDER,
  PROFILE_SERVICE_PROVIDER,
  PROFILE_USECASE_PROVIDERS,
  USER_REPOSITORY_PROVIDER,
  USER_SERVICE_PROVIDER,
  USER_USECASE_PROVIDERS,
} from './domain';
import { ProfilePostgresRepository, ProfileService, UserPostgresRepository, UserService } from './infrastructure';
import { ProfileController, ProfileResolver, UserController, UserResolver } from './presentation';

const validators = [IsUserActiveConstraint, IsUserExistConstraint, IsUserNotHasProfileConstraint];
const resolvers = [UserResolver, ProfileResolver];

const userUsecases = [
  {
    provide: USER_USECASE_PROVIDERS.FETCH_USER,
    useClass: FetchUser,
  },
  {
    provide: USER_USECASE_PROVIDERS.CREATE_USER,
    useClass: CreateUser,
  },
  {
    provide: USER_USECASE_PROVIDERS.UPDATE_USER,
    useClass: UpdateUser,
  },
  {
    provide: USER_USECASE_PROVIDERS.SEARCH_USERS,
    useClass: SearchUsers,
  },
  {
    provide: USER_USECASE_PROVIDERS.ACTIVATE_USER,
    useClass: ActivateUser,
  },
  {
    provide: USER_USECASE_PROVIDERS.DELETE_USER,
    useClass: DeleteUser,
  },
];

const profileUsecases = [
  {
    provide: PROFILE_USECASE_PROVIDERS.FETCH_PROFILE,
    useClass: FetchProfile,
  },
  {
    provide: PROFILE_USECASE_PROVIDERS.CREATE_PROFILE,
    useClass: CreateProfile,
  },
  {
    provide: PROFILE_USECASE_PROVIDERS.UPDATE_PROFILE,
    useClass: UpdateProfile,
  },
  {
    provide: PROFILE_USECASE_PROVIDERS.SEARCH_PROFILES,
    useClass: SearchProfiles,
  },
  {
    provide: PROFILE_USECASE_PROVIDERS.FETCH_USER_PROFILE,
    useClass: FetchUserProfile,
  },
];

@Module({
  imports: [],
  controllers: [UserController, ProfileController],
  providers: [
    ...validators,
    ...resolvers,

    {
      provide: USER_REPOSITORY_PROVIDER,
      useClass: UserPostgresRepository,
    },
    {
      provide: USER_SERVICE_PROVIDER,
      useClass: UserService,
    },
    {
      provide: PROFILE_REPOSITORY_PROVIDER,
      useClass: ProfilePostgresRepository,
    },
    {
      provide: PROFILE_SERVICE_PROVIDER,
      useClass: ProfileService,
    },

    ...userUsecases,
    ...profileUsecases,
  ],
})
export class UserModule {}
