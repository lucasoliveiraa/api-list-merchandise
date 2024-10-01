import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { Roles } from '@decorators/roles.decorator'
import { UserId } from '@decorators/user-id.decorator'
import { UserEntity } from './entities/user.entity'
import { ReturnUserDto } from './dto/return-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdatePassword } from './dto/update-password.dto'
import { UpdateProfileUser } from './dto/update-profile-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserType } from '@utils/enum'
import { ReturnUserAdminDto } from './dto/return-user-admin.dto'
import { ReturnListShopping } from '@src/list-shopping/dto/return-list-shopping.dto'

@ApiTags('User')
@ApiBearerAuth('access-token')
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

  @Roles(UserType.Admin, UserType.Root)
  @Get('/all')
  async getAllUsers(): Promise<ReturnUserAdminDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserAdminDto(userEntity),
    )
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:userId')
  async getUserByIdAdmin(
    @Param('userId') userId: string,
  ): Promise<ReturnUserAdminDto> {
    return new ReturnUserAdminDto(await this.userService.findUserById(userId))
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async getUserById(@UserId() userId: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.findUserById(userId))
  }

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

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/month/:month/year/:year')
  async getUserByShoppingList(
    @UserId() userId: string,
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<ReturnListShopping> {
    return new ReturnListShopping(
      await this.userService.findUserByShoppingList(userId, month, year),
    )
  }
}
