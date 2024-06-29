import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Role } from '../../../../core/constants';

import { User } from '../../domain/entities';
import { ProfileSchema } from './profile.schema';

@ObjectType()
export class UserSchema implements User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  active: boolean;

  @Field()
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ProfileSchema, { name: 'profile', nullable: true })
  profile?: ProfileSchema;
}
