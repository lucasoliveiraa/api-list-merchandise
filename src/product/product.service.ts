import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductDto } from './dto/createProduct.dto'
import { ProductEntity } from './entities/product.entity'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(product: CreateProductDto): Promise<any> {
    // const { name } = CreateProduct
    // const categoryExists = await this.prisma.category
    //   .findFirst({
    //     where: {
    //       name,
    //     },
    //   })
    //   .catch(() => undefined)

    // if (categoryExists) {
    //   throw new BadRequestException(
    //     `Category name ${createCategory.name} exist`,
    //   )
    // }
    console.log(product)
    await this.prisma.item.create({
      data: {
        ...product,
      },
    })
  }
}
