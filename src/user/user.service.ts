import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserType } from './enum/user-type.enum'
import { createPasswordHashed, validatePassword } from 'src/utils/password'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdatePassword } from './dto/update-user.dto'
import { UpdateProfileUser } from './dto/update-profile-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserDto: CreateUserDto,
    userType?: number,
  ): Promise<UserEntity> {
    const { email, password } = createUserDto

    const userWithSameEmail = await this.findUserByEmail(email).catch(
      () => undefined,
    )

    if (userWithSameEmail) {
      throw new ConflictException('Email registered in system')
    }

    const passwordHashed = await createPasswordHashed(password)

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        typeUser: userType || UserType.User,
        password: passwordHashed,
      },
    })
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.prisma.user.findMany()
  }

  async findUserById(userId: string): Promise<UserEntity | null> {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found`)
    }

    return user
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch(() => undefined)

    if (!user) {
      throw new NotFoundException(`Email: ${email} not found`)
    }

    return user
  }

  async updatePasswordUser(
    updatePassword: UpdatePassword,
    userId: string,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId)

    const passwordHash = await createPasswordHashed(updatePassword.newPassword)

    const isMatch = await validatePassword(
      updatePassword.lastPassword,
      user?.password || '',
    )

    if (!isMatch) {
      throw new BadRequestException('Last password invalid')
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...user,
        password: passwordHash,
      },
    })
  }

  async updateProfileUser(
    updateProfileUser: UpdateProfileUser,
    userId: string,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId)

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...user,
        ...updateProfileUser,
      },
    })
  }
}
