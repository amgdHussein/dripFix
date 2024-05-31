import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { QueryDto, QueryResultDto } from '../../../../core/shared';

import { ActivateUser, CreateUser, DeleteUser, FetchUser, SearchUsers, UpdateUser } from '../../application';
import { USER_USECASE_PROVIDERS } from '../../domain';

import { Public } from '../../../../core/decorators';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_USECASE_PROVIDERS.FETCH_USER) private readonly fetchUserUsecase: FetchUser,
    @Inject(USER_USECASE_PROVIDERS.CREATE_USER) private readonly createUserUsecase: CreateUser,
    @Inject(USER_USECASE_PROVIDERS.UPDATE_USER) private readonly updateUserUsecase: UpdateUser,
    @Inject(USER_USECASE_PROVIDERS.SEARCH_USERS) private readonly searchUsersUsecase: SearchUsers,
    @Inject(USER_USECASE_PROVIDERS.ACTIVATE_USER) private readonly activateUserUsecase: ActivateUser,
    @Inject(USER_USECASE_PROVIDERS.DELETE_USER) private readonly deleteUserUsecase: DeleteUser,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Fetch user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'vqOgmOTNaxYucTIrZAZ8',
    required: true,
    description: 'The ID of the user',
  })
  @ApiResponse({
    type: UserDto,
    description: 'The user with the specified ID',
  })
  public async fetchUser(@Param('id') id: string): Promise<UserDto> {
    return this.fetchUserUsecase.execute(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    required: true,
    description: 'The information required to create a new user',
  })
  @ApiResponse({
    type: UserDto,
    description: 'The newly created user',
  })
  public async createUser(@Body() entity: CreateUserDto): Promise<UserDto> {
    return this.createUserUsecase.execute(entity);
  }

  @Post('active/:id')
  @ApiOperation({ summary: 'Activate an existing user' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'vqOgmOTNaxYucTIrZAZ8',
    required: true,
    description: 'The ID of the user to be activated',
  })
  @ApiResponse({
    type: UserDto,
    description: 'The recently activated user',
  })
  public async activateUser(@Param('id') id: string): Promise<UserDto> {
    return this.activateUserUsecase.execute(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update user information' })
  @ApiBody({
    type: UpdateUserDto,
    required: true,
    description: 'The user information to be updated',
  })
  @ApiResponse({
    type: UserDto,
    description: 'The updated user',
  })
  public async updateUser(@Body() entity: UpdateUserDto): Promise<UserDto> {
    return this.updateUserUsecase.execute(entity);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Search for users with optional filters' })
  @ApiBody({
    type: QueryDto,
    required: false,
    description: 'Query parameters for filtering and sorting users',
  })
  @ApiResponse({
    type: QueryResultDto<UserDto>,
    description: 'A list of users that match the query parameters',
  })
  public async searchUsers(@Query() query: QueryDto): Promise<QueryResultDto<UserDto>> {
    const { page, limit, params, order } = query;
    return this.searchUsersUsecase.execute(page, limit, params, order);
  }

  @Get('delete/:id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'vqOgmOTNaxYucTIrZAZ8',
    required: true,
    description: 'The ID of the user to be deleted',
  })
  @ApiResponse({
    type: UserDto,
    description: 'The response after deleting the user',
  })
  public async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.deleteUserUsecase.execute(id);
  }
}
