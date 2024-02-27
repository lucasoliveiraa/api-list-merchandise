import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { UserPayload } from 'src/guards/jwt.strategy'
import { CreateListDto } from './dto/createList.dto'
import { ListService } from './list.service'

@Controller('list')
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(
    @Body() createList: CreateListDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.listService.createList(createList, user)
  }
}
