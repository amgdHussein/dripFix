import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Role } from '../../../../core/constants';
import { User } from '../../domain';

export class UserDto implements User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: 'vqOgmOTNaxYucTIrZAZ8',
    description: 'The unique identifier of the user',
  })
  id: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    type: String,
    required: false,
    example: 'amgad.hussein@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    example: 'Amgad Hussein',
    description: 'The name of the user',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    name: 'active',
    type: Boolean,
    required: true,
    example: true,
    description: 'Indicate whither the user is active or not',
  })
  active: boolean;

  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({
    name: 'role',
    enum: Role,
    required: true,
    example: Role.USER,
    description: 'The role of the user',
  })
  role: Role;

  @IsDateString()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    required: false,
    example: '2024-05-27T07:07:56.558Z',
    description: 'The date when the user created.',
  })
  createdAt: string;

  @IsDateString()
  @ApiProperty({
    name: 'updateAt',
    type: Number,
    required: false,
    example: '2024-05-27T07:07:56.558Z',
    description: 'The date when the user updated.',
  })
  updatedAt: string;
}
