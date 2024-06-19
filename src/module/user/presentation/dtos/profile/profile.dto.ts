import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsUserExist, IsUserNotHasProfile } from '../../../application';
import { Profile } from '../../../domain';

export class ProfileDto implements Profile {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: 'a40d5019-d053-4477-81af-3808dbe62b31',
    description: 'The unique identifier of the user',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsUserExist()
  @IsUserNotHasProfile()
  @ApiProperty({
    name: 'userId',
    type: String,
    required: true,
    example: 'user123',
    description: 'The unique identifier of the user who owns the profile',
  })
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'bio',
    type: String,
    required: false,
    example: 'This is a bio.',
    description: 'The bio of the user',
  })
  bio: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'avatar',
    type: String,
    required: false,
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar URL of the user',
  })
  avatar: string | null;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    required: false,
    example: '2024-05-27T07:07:56.558Z',
    description: 'The date when the profile created.',
  })
  createdAt: Date;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    name: 'updatedAt',
    type: Date,
    required: false,
    example: '2024-05-27T07:07:56.558Z',
    description: 'The date when the profile updated.',
  })
  updatedAt: Date;
}
