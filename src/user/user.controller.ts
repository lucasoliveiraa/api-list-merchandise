import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { ReturnUserDto } from './dto/return-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from './enum/user-type.enum'
import { UserEntity } from './entities/user.entity'
import { UpdatePassword } from './dto/update-user.dto'
import { UserId } from 'src/decorators/user-id.decorator'
import { UpdateProfileUser } from './dto/update-profile-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserType.Root)
  @Post('/admin')
  async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.Admin)
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.createUser(createUser))
  }

  @Get('/all')
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    )
  }

  // @Roles(UserType.Admin, UserType.Root)
  // @Get('/:userId')
  // async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
  //   return new ReturnUserDto(
  //     await this.userService.getUserByIdUsingRelations(userId),
  //   )
  // }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch('/update-password')
  async updatePasswordUser(
    @Body() updatePassword: UpdatePassword,
    @UserId() userId: string,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePassword, userId)
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Put('/update-profile')
  async updateProfileUser(
    @Body() updateProfileUser: UpdateProfileUser,
    @UserId() userId: string,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.updateProfileUser(updateProfileUser, userId),
    )
  }
}
