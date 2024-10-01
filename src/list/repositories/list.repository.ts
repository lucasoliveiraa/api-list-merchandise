import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { ListEntity } from '../entities/list.entity'
import { CreateListDto } from '../dto/createList.dto'
import { InsertList } from '../dto/insert-list.dto'
import { DeleteResult } from 'typeorm'

const LINE_AFFECTED = 1
@Injectable()
export class ListRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createList(
    createList: CreateListDto,
    userId: string,
  ): Promise<ListEntity> {
    return this.prisma.list.create({
      data: {
        ...createList,
        userId,
      },
    })
  }

  async insertProductInList(
    insertList: InsertList,
    userId: string,
  ): Promise<void> {
    const list = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    console.log(list, insertList)
  }

  async findListById(
    listId: string,
    isRelations?: boolean,
  ): Promise<ListEntity | null> {
    const relations = isRelations
      ? {
          productList: {
            include: {
              product: true,
            },
          },
        }
      : undefined

    return this.prisma.list.findUnique({
      where: {
        id: listId,
      },
      include: relations,
    })
  }

  async delete(listId: string, userId: string): Promise<DeleteResult> {
    console.log(listId, userId)
    await this.prisma.list.delete({
      where: {
        id: listId,
      },
    })

    return {
      raw: [],
      affected: LINE_AFFECTED,
    }
  }

  async clearList(listId: string, userId: string): Promise<DeleteResult> {
    await this.prisma.productList.deleteMany({
      where: {
        listId,
      },
    })

    return {
      raw: [],
      affected: LINE_AFFECTED,
    }
  }

  async findShoppingList(
    userId: string,
    month: number,
    year: number,
  ): Promise<any> {
    console.log('====> STAR', month, year)

    return this.prisma.shoppingList.findFirst({
      where: {
        userId,
        month,
        year,
      },
      // include: {
      //   lists: true, // Inclui as listas associadas a este shopping list
      // },
    })
  }

  async createShoppingList(
    userId: string,
    month: number,
    year: number,
  ): Promise<any> {
    // const startDate = new Date(year, month - 1, 1)
    // const endDate = new Date(year, month, 0)

    console.log('====> createShoppingList', month, year)

    return this.prisma.shoppingList.create({
      data: {
        userId,
        month,
        year,
      },
    })
  }

  async updatePurchasedInList(listId: string, shoppingList: any): Promise<any> {
    console.log('AQUI ===== AT')
    await this.prisma.list.update({
      where: { id: listId },
      data: {
        shoppingListId: shoppingList.id,
        dateInitialPurchased: new Date(),
      },
    })
  }
}
