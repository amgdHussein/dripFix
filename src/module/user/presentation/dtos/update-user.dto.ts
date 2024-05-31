import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { IsUserActive } from '../../application';
import { UserDto } from './user.dto';

class ActiveUserIdDto {
  @IsString()
  @IsNotEmpty()
  @IsUserActive()
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: 'vqOgmOTNaxYucTIrZAZ8',
    description: 'The unique identifier of the user',
  })
  readonly id: string;
}

export class UpdateUserDto extends IntersectionType(ActiveUserIdDto, PartialType(PickType(UserDto, ['name', 'email']))) {}
