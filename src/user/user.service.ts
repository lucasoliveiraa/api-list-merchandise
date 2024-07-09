import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdatePassword } from './dto/update-password.dto'
import { UpdateProfileUser } from './dto/update-profile-user.dto'
import { createPasswordHashed, validatePassword } from '@utils/password'

@Injectable()
export class UserService {
  constructor(private readonly userRepostiry: UserRepository) {}

  async createUser(
    createUserDto: CreateUserDto,
    userType?: number,
  ): Promise<UserEntity> {
    const { email, password } = createUserDto
    const userWithSameEmail = await this.findUserByEmail(email).catch(
      () => undefined,
    )

    // const userWithSameCpf = await this.findUserByCpf(cpf).catch(() => undefined)

    if (userWithSameEmail) {
      throw new ConflictException('Email registered in system')
    }

    // if (userWithSameCpf) {
    //   throw new ConflictException('CPF registered in system')
    // }

    const passwordHashed = await createPasswordHashed(password)
    return this.userRepostiry.create(createUserDto, passwordHashed, userType)
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepostiry.findAll()
  }

  // async getUserByIdUsingRelations(
  //   userId: string,
  //   // isRelations?: boolean,
  // ): Promise<any> {
  //   // const relations = isRelations
  //   //   ? {
  //   //       itens: true,
  //   //     }
  //   //   : undefined
  //   return this.userRepostiry.getUserByIdUsingRelations(userId)
  // }

  async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepostiry.findUserById(userId)

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found`)
    }

    return user
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepostiry.findUserByEmail(email)

    if (!user) {
      throw new NotFoundException(`Email: ${email} not found`)
    }

    return user
  }

  async findUserByCpf(cpf: string): Promise<UserEntity> {
    const user = await this.userRepostiry.findUserByCpf(cpf)

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

    return this.userRepostiry.updatePasswordUser(userId, passwordHash)
  }

  async updateProfileUser(
    updateProfileUser: UpdateProfileUser,
    userId: string,
  ): Promise<UserEntity> {
    await this.findUserById(userId)
    return this.userRepostiry.updateProfileUser(userId, updateProfileUser)
  }

  async findUserByShoppingList(
    userId: string,
    month: number,
    year: number,
  ): Promise<UserEntity> {
    console.log('======', userId, month, year)
    const user = await this.userRepostiry.findUserByShoppingList(
      userId,
      month,
      year,
    )

    console.log('=====> USER MONTH', user)
    console.log('=====> USER MONTH', user.lists)

    if (!user) {
      throw new NotFoundException(`UserId: ${userId} not found`)
    }

    return user
  }
}
