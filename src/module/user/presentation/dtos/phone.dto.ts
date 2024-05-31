import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Phone } from '../../domain';

export class PhoneDto implements Phone {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'country',
    type: String,
    required: true,
    example: 'EG',
    description: '2-letter country code',
  })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'code',
    type: String,
    required: true,
    example: '+20',
    description: 'Prefix number reserved for country',
  })
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'value',
    type: String,
    required: true,
    example: '1012345888',
    description: 'The phone number',
  })
  readonly value: string;
}
