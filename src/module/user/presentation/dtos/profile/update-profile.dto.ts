import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { IsUserActive } from '../../../application';
import { ProfileDto } from './profile.dto';

class ActiveUserIdDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: 'a40d5019-d053-4477-81af-3808dbe62b31',
    description: 'The unique identifier of the user profile',
  })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @IsUserActive()
  @ApiProperty({
    name: 'userId',
    type: String,
    required: true,
    example: 'a40d5019-d053-4477-81af-3808dbe62b31',
    description: 'The unique identifier of the user',
  })
  readonly userId: string;
}

export class UpdateProfileDto extends IntersectionType(ActiveUserIdDto, PartialType(PickType(ProfileDto, ['avatar', 'bio']))) {}
