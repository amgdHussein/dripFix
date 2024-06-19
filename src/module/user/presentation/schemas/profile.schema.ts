import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Profile } from '../../domain/entities';

@ObjectType()
export class ProfileSchema implements Profile {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  userId: string;

  @Field(() => String, { nullable: true })
  bio: string | null;

  @Field(() => String, { nullable: true })
  avatar: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
