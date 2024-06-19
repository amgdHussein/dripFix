import { PickType } from '@nestjs/swagger';

import { ProfileDto } from './profile.dto';

export class CreateProfileDto extends PickType(ProfileDto, ['userId', 'bio', 'avatar']) {}
