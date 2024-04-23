import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductDto } from '../dto/createProduct.dto'
import { ProductEntity } from '../entities/product.entity'

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduct: CreateProductDto): Promise<ProductEntity> {
    console.log('creating product', createProduct)
    return this.prisma.item.create({
      data: {
        ...createProduct,
      },
    })
  }
}
