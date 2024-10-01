import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UserEntity } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateProfileUser } from '../dto/update-profile-user.dto'
import { UserType } from '@utils/enum'
import { PrismaService } from '@prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
    password: string,
    userType?: number,
  ): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        typeUser: userType || UserType.User,
        password,
      },
    })
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany()
  }

  // async getUserByIdUsingRelations(
  //   userId: string,
  //   // isRelations?: boolean,
  // ): Promise<any> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       lists: {
  //         include: {
  //           productList: true,
  //         },
  //       },
  //     },
  //   })

  //   return user
  // }

  async findUserById(userId: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        lists: true,
      },
    })
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findUserByCpf(cpf: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })
  }

  async updatePasswordUser(
    userId: string,
    passwordHash: string,
  ): Promise<UserEntity> {
    const updateData: Prisma.UserUpdateInput = {
      password: passwordHash,
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateData,
      },
    })
  }

  async updateProfileUser(
    userId: string,
    updateProfileUser: UpdateProfileUser,
  ): Promise<UserEntity> {
    const updateData: Prisma.UserUpdateInput = {
      ...updateProfileUser,
    }
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateData,
      },
    })
  }
}
