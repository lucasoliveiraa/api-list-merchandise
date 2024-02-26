import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

@Controller('list')
@UseGuards(JwtAuthGuard)
export class ListController {
  @Post()
  async handle() {
    return 'ok'
  }
}
