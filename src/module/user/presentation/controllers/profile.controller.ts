import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProfile, FetchProfile, FetchUserProfile, SearchProfiles, UpdateProfile } from '../../application';
import { PROFILE_USECASE_PROVIDERS } from '../../domain';

import { Public } from '../../../../core/decorators';
import { CreateProfileDto, ProfileDto, ProfileQueryDto, ProfileQueryResultDto, UpdateProfileDto } from '../dtos';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(
    @Inject(PROFILE_USECASE_PROVIDERS.FETCH_PROFILE)
    private readonly fetchProfileUsecase: FetchProfile,

    @Inject(PROFILE_USECASE_PROVIDERS.FETCH_USER_PROFILE)
    private readonly fetchUserProfileUsecase: FetchUserProfile,

    @Inject(PROFILE_USECASE_PROVIDERS.CREATE_PROFILE)
    private readonly createProfileUsecase: CreateProfile,

    @Inject(PROFILE_USECASE_PROVIDERS.UPDATE_PROFILE)
    private readonly updateProfileUsecase: UpdateProfile,

    @Inject(PROFILE_USECASE_PROVIDERS.SEARCH_PROFILES)
    private readonly searchProfilesUsecase: SearchProfiles,
  ) {}

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Fetch profile by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a40d5019-d053-4477-81af-3808dbe62b31',
    required: true,
    description: 'The ID of the profile',
  })
  @ApiResponse({
    type: ProfileDto,
    description: 'The profile with the specified ID',
  })
  public async fetchProfile(@Param('id') id: string): Promise<ProfileDto> {
    return this.fetchProfileUsecase.execute(id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Fetch profile by ID' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'a40d5019-d053-4477-81af-3808dbe62b31',
    required: true,
    description: 'The ID of the profile',
  })
  @ApiResponse({
    type: ProfileDto,
    description: 'The profile with the specified ID',
  })
  public async fetchUserProfile(@Query('userId') userId: string): Promise<ProfileDto> {
    return this.fetchUserProfileUsecase.execute(userId);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody({
    type: CreateProfileDto,
    required: true,
    description: 'The profile information to be created',
  })
  @ApiResponse({
    type: ProfileDto,
    description: 'The created profile',
  })
  public async createProfile(@Body() entity: CreateProfileDto): Promise<ProfileDto> {
    return this.createProfileUsecase.execute(entity);
  }

  @Public()
  @Put()
  @ApiOperation({ summary: 'Update profile information' })
  @ApiBody({
    type: UpdateProfileDto,
    required: true,
    description: 'The profile information to be updated',
  })
  @ApiResponse({
    type: ProfileDto,
    description: 'The updated profile',
  })
  public async updateProfile(@Body() entity: UpdateProfileDto): Promise<ProfileDto> {
    return this.updateProfileUsecase.execute(entity);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Search for profiles with optional filters' })
  @ApiBody({
    type: ProfileQueryDto,
    required: false,
    description: 'Query parameters for filtering and sorting profiles',
  })
  @ApiResponse({
    type: ProfileQueryResultDto,
    description: 'A list of profiles that match the query parameters',
  })
  public async searchProfiles(@Query() query: ProfileQueryDto): Promise<ProfileQueryResultDto> {
    console.log('🚀 ~ ProfileController ~ searchProfiles ~ query:', query);
    const { page, limit, params, order } = query;
    return this.searchProfilesUsecase.execute(page, limit, params, order);
  }
}
