import { Controller } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProduct } from './dto/createProduct.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly prisma: PrismaService) {}

  async handle(createProduct: CreateProduct) {
    await this.prisma.item.create({
      data: {
        ...createProduct,
        listId: 'awdawd',
        categoryId: 'awdawdaw',
      },
    })
  }
}
