import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { In } from 'typeorm'
import { PrismaService } from '@prisma/prisma.service'
import { ProductEntity } from '../entities/product.entity'
import { CreateProductDto } from '../dto/createProduct.dto'
import { UpdateProduct } from '../dto/update-product.dto'

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProduct: CreateProductDto): Promise<any> {
    console.log('creating product', createProduct)
    return this.prisma.product.create({
      data: {
        ...createProduct,
      },
    })
  }

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<any[]> {
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
    return this.prisma.product.findMany(findOptions)
  }

  async findProductById(
    productId: string,
    isRelations?: boolean,
  ): Promise<any> {
    console.log('aquiiiiii')
    const relations = isRelations
      ? {
          category: true,
        }
      : undefined

    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: relations,
    })
  }

  async delete(productId: string) {
    return this.prisma.product.delete({ where: { id: productId } })
  }

  async update(updateProduct: UpdateProduct, productId: string): Promise<any> {
    const updateData: Prisma.ProductUpdateInput = {
      ...updateProduct,
    }
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...updateData,
      },
    })
  }
}
