import { Module } from '@nestjs/common';

import { ActivateUser, CreateUser, DeleteUser, FetchUser, IsUserActiveConstraint, SearchUsers, UpdateUser } from './application';
import { USER_REPOSITORY_PROVIDER, USER_SERVICE_PROVIDER, USER_USECASE_PROVIDERS } from './domain';
import { UserPostgresRepository, UserService } from './infrastructure';
import { UserController, UserResolver } from './presentation';

const validators = [IsUserActiveConstraint];
const resolvers = [UserResolver];

@Module({
  imports: [],
  controllers: [UserController],
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
  ],
})
export class UserModule {}
