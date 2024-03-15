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
import { Prisma } from '@prisma/client'
import { ReturnUserDto } from './dto/return-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserDto: CreateUserDto,
    userType?: number,
  ): Promise<UserEntity> {
    const { email, password, cpf } = createUserDto

    const userWithSameEmail = await this.findUserByEmail(email).catch(
      () => undefined,
    )

    const userWithSameCpf = await this.findUserByCpf(cpf).catch(() => undefined)

    if (userWithSameEmail) {
      throw new ConflictException('Email registered in system')
    }

    if (userWithSameCpf) {
      throw new ConflictException('CPF registered in system')
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

  async getUserByIdUsingRelations(
    userId: string,
    // isRelations?: boolean,
  ): Promise<any> {
    // const relations = isRelations
    //   ? {
    //       itens: true,
    //     }
    //   : undefined

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        lists: {
          include: {
            itemList: true,
          },
        },
      },
    })

    return user
  }

  async findUserById(userId: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
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

  async findUserByCpf(cpf: string): Promise<UserEntity> {
    const user = await this.prisma.user
      .findUnique({
        where: {
          cpf,
        },
      })
      .catch(() => undefined)

    if (!user) {
      throw new NotFoundException(`CPF: ${cpf} not found`)
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
      throw new BadRequestException('Senha anterior inválida')
    }

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
    updateProfileUser: UpdateProfileUser,
    userId: string,
  ): Promise<UserEntity> {
    await this.findUserById(userId)
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
