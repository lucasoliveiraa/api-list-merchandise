import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'

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
}
