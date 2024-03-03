import { Body, Controller, Post } from '@nestjs/common'
import { CreateListDto } from './dto/createList.dto'
import { ListService } from './list.service'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from 'src/user/enum/user-type.enum'
import { UserId } from 'src/decorators/user-id.decorator'
import { ListEntity } from './entities/list.entity'
import { InsertList } from './dto/insert-list.dto'

@Controller('list')
@Roles(UserType.Admin, UserType.Root, UserType.User)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(
    @Body() createList: CreateListDto,
    // @CurrentUser() user: UserPayload,
    @UserId() userId: string,
  ): Promise<ListEntity> {
    return this.listService.createList(createList, userId)
  }

  // @Post()
  // @Roles(UserType.Admin, UserType.Root, UserType.User)
  // async insertProductList(
  //   insertList: InsertList,
  //   userId: string,
  // ): Promise<void> {
  //   return this.listService.insertProductList(insertList, userId)
  // }
}
