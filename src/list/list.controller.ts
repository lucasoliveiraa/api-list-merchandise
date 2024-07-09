import { Body, Controller, Param, Post, Get, Delete, Put } from '@nestjs/common'
import { CreateListDto } from './dto/createList.dto'
import { ListService } from './list.service'
import { Roles } from '@decorators/roles.decorator'
import { UserId } from '@decorators/user-id.decorator'
import { ListEntity } from './entities/list.entity'
import { InsertList } from './dto/insert-list.dto'
import { ReturnList } from './dto/return-list.dto'
import { DeleteResult } from 'typeorm'
import { UpdateList } from './dto/update-list.dto'
import { ApiTags } from '@nestjs/swagger'
import { UserType } from '@utils/enum'

@ApiTags('List')
@Controller('list')
@Roles(UserType.Admin, UserType.Root, UserType.User)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(
    @Body() createList: CreateListDto,
    @UserId() userId: string,
  ): Promise<ListEntity> {
    return this.listService.createList(createList, userId)
  }

  @Post('insert-product/:listId')
  async insertProductList(
    @Param('listId') listId: string,
    @Param('productId') productId: string,
  ): Promise<ReturnList> {
    return new ReturnList(
      await this.listService.insertProductInList(listId, productId),
    )
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/:listId')
  async getListByUserId(@Param('listId') listId: string): Promise<ReturnList> {
    return new ReturnList(await this.listService.findListById(listId, true))
  }

  @Delete('/:listId')
  async deleteList(
    @Param('listId') listId: string,
    @UserId() userId: string,
  ): Promise<DeleteResult> {
    return this.listService.deleteList(listId, userId)
  }

  @Delete('clear/:listId/')
  async deleteAllProductInList(
    @Param('listId') listId: string,
    @UserId() userId: string,
  ): Promise<DeleteResult> {
    return this.listService.clearList(listId, userId)
  }

  @Delete('/:listId/product/:productId')
  async deleteProductList(
    @Param('listId') listId: string,
    @Param('productId') productId: string,
  ): Promise<DeleteResult> {
    return this.listService.deleteProductList(listId, productId)
  }

  // @Patch()
  // async updateProductInList(
  //   @Body() updateProductList: UpdateList,
  //   @Param('listId') listId: string,
  // ) {
  //   // return new ReturnList(
  //   // await this.listService.updateProductInList(updateProductList, listId),
  //   // )
  // }

  @Put('update-product/:listId/:productId')
  async updateProductInList(
    @Param('listId') listId: string,
    @Param('productId') productId: string,
    @Body() updateList: UpdateList,
  ): Promise<ReturnList> {
    const updatedList = await this.listService.updateProductInList(
      listId,
      productId,
      updateList,
    )
    return new ReturnList(updatedList)
  }

  @Post(':listId/start-purchase')
  async startPurchase(@Param('listId') listId: string): Promise<void> {
    await this.listService.startPurchase(listId)
  }
}
