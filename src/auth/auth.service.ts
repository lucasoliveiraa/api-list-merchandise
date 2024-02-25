import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login() {
    console.log('aquuiiiii')
    const token = this.jwtService.sign({ sub: 'user-id' })

    return token
  }
}
