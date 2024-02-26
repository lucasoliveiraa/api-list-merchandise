import { AuthService } from './auth.service'
import { Body, Controller, Post } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async handle(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto)
  }
}
