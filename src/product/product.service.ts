import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductDto } from './dto/createProduct.dto'
import { ProductEntity } from './entities/product.entity'
import { CategoryService } from 'src/category/category.service'
import { In } from 'typeorm'

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {}

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      }
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        include: {
          category: true,
        },
      }
    }

    console.log('testeee', findOptions)
    const products = await this.prisma.item.findMany(findOptions)
    console.log('====> ', products)

    if (!products || products.length === 0) {
      throw new NotFoundException('Not found products')
    }

    return products
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId)
    return this.prisma.item.create({
      data: {
        ...createProduct,
      },
    })
  }

  async findProductById(
    productId: string,
    isRelations?: boolean,
  ): Promise<ProductEntity> {
    const relations = isRelations
      ? {
          category: true,
        }
      : undefined

    const product = await this.prisma.item.findUnique({
      where: {
        id: productId,
      },
      include: relations,
    })

    if (!product) {
      throw new NotFoundException(`Product id: ${productId} not found`)
    }

    return product
  }

  async deleteProduct(
    productId: string,
  ): Promise<{ message: string; statusCode: number }> {
    await this.findProductById(productId)

    await this.prisma.item.delete({ where: { id: productId } })
    return {
      message: 'Categoria excluída com sucesso',
      statusCode: HttpStatus.OK,
    }
  }
}
