import { Body, Controller, Post } from '@nestjs/common'
import { CreateListDto } from './dto/createList.dto'
import { ListService } from './list.service'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from 'src/user/enum/user-type.enum'
import { UserId } from 'src/decorators/user-id.decorator'

@Controller('list')
@Roles(UserType.Admin, UserType.Root, UserType.User)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(
    @Body() createList: CreateListDto,
    // @CurrentUser() user: UserPayload,
    @UserId() userId: string,
  ) {
    return this.listService.createList(createList, userId)
  }
}
