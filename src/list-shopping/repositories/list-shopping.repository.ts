import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { ListShoppingEntity } from '../entities/list-shopping.entity'

@Injectable()
export class ListShoppingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insertProductInList(listProduct: any): Promise<any> {
    console.log('insertProductInList', listProduct)
    return this.prisma.productList.create({
      data: {
        ...listProduct,
      },
    })
  }

  async findUserByShoppingList(
    userId: string,
    month: number,
    year: number,
  ): Promise<ListShoppingEntity> {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    console.log('====> STAR', startDate, endDate)

    const shoppingList = await this.prisma.shoppingList.findFirst({
      where: {
        userId,
        month,
        year,
      },
      include: {
        lists: {
          include: {
            productList: true,
          },
        },
      },
      // include: {
      //   lists: true, // Inclui as listas associadas a este shopping list
      // },
    })
    console.log('=====> ', shoppingList)
    return shoppingList as ListShoppingEntity
    // return this.prisma.shoppingList.findMany({
    //   where: {
    //     userId,
    //     createdAt: {
    //       gte: startDate,
    //       lte: endDate,
    //     },
    //   },
    // })
  }
}
