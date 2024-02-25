import { AuthService } from './auth.service'
import { Controller, Post } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  // async login(@Body() loginDto: LoginDto) {
  async handle() {
    // return this.authService.login(loginDto)
    return this.authService.login()
  }
}
