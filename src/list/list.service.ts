import { Injectable, NotFoundException } from '@nestjs/common'
import { ListProductService } from './../list-product/list-product.service'
import { CreateListDto } from './dto/createList.dto'
import { ListEntity } from './entities/list.entity'
import { InsertList } from './dto/insert-list.dto'
import { ListRepository } from './repositories/list.repository'
import { DeleteResult } from 'typeorm'
import { UpdateList } from './dto/update-list.dto'

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly listProductService: ListProductService,
  ) {}

  async createList(
    createList: CreateListDto,
    userId: string,
  ): Promise<ListEntity> {
    return this.listRepository.createList(createList, userId)
  }

  async insertProductInList(
    listId: string,
    productId: string,
  ): Promise<ListEntity> {
    const list = await this.findListById(listId, true)

    await this.listProductService.insertProductInList(productId, list)

    return list
  }

  async findListById(
    listId: string,
    isRelations?: boolean,
  ): Promise<ListEntity> {
    const list = await this.listRepository.findListById(listId, isRelations)

    if (!list) {
      throw new NotFoundException(`List not found`)
    }

    return list
  }

  async deleteList(listId: string, userId: string): Promise<DeleteResult> {
    const list = await this.findListById(listId, true)

    if (list) {
      console.log('list', list)
      await this.clearList(listId, userId)
    }

    return this.listRepository.delete(listId, userId)
  }

  async clearList(listId: string, userId: string): Promise<DeleteResult> {
    return this.listRepository.clearList(listId, userId)
  }

  async deleteProductList(
    listId: string,
    productId: string,
  ): Promise<DeleteResult> {
    const list = await this.findListById(listId)

    return this.listProductService.deleteProductList(list.id, productId)
  }

  async updateProductInList(
    listId: string,
    productId: string,
    updateList: UpdateList,
  ): Promise<ListEntity> {
    const list = await this.findListById(listId, true)

    // await this.listProductService.updateProductInList(
    //   listId,
    //   productId,
    //   updateList,
    //   list,
    // )

    await this.listProductService.updateProductInProductList(
      listId,
      productId,
      updateList,
      list,
    )

    return list
  }

  async startPurchase(listId: string): Promise<void> {
    const list = await this.findListById(listId)

    if (!list) {
      throw new NotFoundException(`List with ID ${listId} not found`)
    }

    const { userId } = list
    const now = new Date()
    const month = now.getMonth() + 1 // JavaScript months are 0-based
    // const month = 7 // JavaScript months are 0-based
    const year = now.getFullYear()

    console.log('====> Starting purchase', month, year)

    let shoppingList = await this.listRepository.findShoppingList(
      userId,
      month,
      year,
    )

    console.log('====> Starting purchase shoppingList', shoppingList)

    if (!shoppingList) {
      console.log('IF')
      shoppingList = await this.listRepository.createShoppingList(
        userId,
        month,
        year,
      )
    }

    await this.listRepository.updatePurchasedInList(listId, shoppingList)
  }
  // await this.prisma.list.update({
  //   where: { id: listId },
  //   data: {
  //     dateInitialPurchased: new Date(),
  //     shoppingListId: shoppingList.id,
  //   },
  // })
}
