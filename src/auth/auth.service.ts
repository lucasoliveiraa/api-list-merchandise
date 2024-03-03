import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { validatePassword } from 'src/utils/password'
import { ReturnLogin } from './dto/returnLogin.dto'
import { LoginPayload } from './dto/loginPayload.dto'
import { ReturnUserDto } from 'src/user/dto/return-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const { email, password } = loginDto
    const user = await this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch(() => undefined)

    const isMatch = await validatePassword(password, user?.password || '')

    if (!user || !isMatch) {
      throw new UnauthorizedException('Email or password invalid')
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    }
  }
}
