import { ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserType } from './enum/user-type.enum'
import { createPasswordHashed } from 'src/utils/password'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto, userType?: number) {
    console.log(createUserDto)
    console.log(userType)

    const { email, password } = createUserDto

    const userWithSameEmail = await this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch(() => undefined)

    console.log('=====>', userWithSameEmail)
    if (userWithSameEmail) {
      throw new ConflictException('Email registered in system')
    }

    const passwordHashed = await createPasswordHashed(password)

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        typeUser: userType || UserType.User,
        password: passwordHashed,
      },
    })
  }

  // async getAllUser(): Promise<UserEntity[]> {
  //   return this.prisma.user.findMany()
  // }
}
