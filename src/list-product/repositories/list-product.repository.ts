import { BadRequestException, Injectable } from '@nestjs/common'
import { InsertList } from 'src/list/dto/insert-list.dto'
import { PrismaService } from '@prisma/prisma.service'
import { ListProductEntity } from '../entities/list-product.entity'
import { DeleteResult } from 'typeorm'
import { Prisma } from '@prisma/client'
import { UpdateList } from 'src/list/dto/update-list.dto'
import { ListEntity } from 'src/list/entities/list.entity'
import { UpdateProductInList } from '../dto/update-product-in-list.dto'
import { skip } from 'node:test'

const LINE_AFFECTED = 1

@Injectable()
export class ListProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async insertProductInList(listProduct: any): Promise<any> {
    console.log('insertProductInList', listProduct)
    return this.prisma.productList.create({
      data: {
        ...listProduct,
      },
    })
  }

  async createProductInList(
    productId: string,
    listId: string,
  ): Promise<ListProductEntity> {
    const productList = await this.prisma.productList.create({
      data: {
        productId,
        listId,
      },
    })

    if (productList) {
      throw new BadRequestException('Error creating product in list')
    }

    return productList
  }

  async verifyProductInList(productId: string, listId: string): Promise<any> {
    console.log("verifyProductInList', productId: ", productId, listId)
    const teste = await this.prisma.productList
      .findFirst({
        where: {
          productId,
          listId,
        },
      })
      .catch(() => null)

    console.log('teste vere', teste)
    return teste
  }

  async delete(listId: string, productId: string): Promise<DeleteResult> {
    console.log('delete', productId, listId)
    await this.prisma.productList.deleteMany({
      where: {
        productId,
      },
    })

    return {
      raw: [],
      affected: LINE_AFFECTED,
    }
  }

  async updateProductInList(
    productId: string,
    listId: string,
    updatedProductList: any,
    isRelations?: boolean,
  ): Promise<any> {
    console.log('updateProductInList', isRelations)
    console.log('updatedProductList produ', updatedProductList)
    console.log('productId produ', productId)
    console.log('listId produ', listId)

    const teste = updatedProductList.find((p) => p.productId === productId)
    console.log('testeeeeee', teste)
    const productListtttt = await this.prisma.productList.findFirst({
      where: {
        listId,
        productId,
      },
      include: {
        product: true, // Inclui o objeto Product associado
      },
    })
    console.log('updatedProduct  productList', productListtttt)
    const updatedProduct = await this.prisma.productList.update({
      where: { id: productListtttt?.id },
      data: {
        price: teste.product.price,
        quantity: teste.product.quantity,
        quantityMeasure: teste.product.quantityMeasure,
      },
      include: {
        product: true,
      },
    })

    // const updatedProduct = await this.prisma.product.update({
    //   where: { id: productId },
    //   data: {
    //     price: teste.product.price,
    //     quantity: teste.product.quantity,
    //     quantityMeasure: teste.product.quantityMeasure,
    //   },
    //   // include: {
    //   //   productList: true,
    //   // },
    // })
    console.log('updatedProduct  TESTEEE', updatedProduct)
    return updatedProduct
    // const relations = isRelations
    //   ? {
    //       productList: {
    //         include: {
    //           product: true,
    //         },
    //       },
    //     }
    //   : undefined

    // const teste = updatedProductList.find((p) => p.productId === productId)
    // console.log('teste', teste)
    // const testeeee = (updatedProductList || []).map((product) => {
    //   console.log('PRODUCT22222', product)
    //   if (product.productId === productId) {
    //     console.log('PRODUCT', product)
    //     // return product
    //     return {
    //       ...product,
    //       // product: {
    //       //   ...product.product,
    //       //   // price: updatedProductList.product.price,
    //       //   // quantity: updatedProductList.product.quantity,
    //       //   // quantityMeasure: updatedProductList.product.quantityMeasure,
    //       // },
    //     }
    //   }
    //   // console.log('updateProductInList PRODUC', product)
    //   return product
    // })
    // console.log('testeeee', testeeee)

    // return this.prisma.list.update({
    //   where: { id: listId },
    //   include: relations,
    //   data: {
    //     productList: {
    //       updateMany: testeeee.map((updateProduct) => ({
    //         where: {
    //           productId:
    //             updateProduct.productId !== productId ? skip() : productId,
    //         }, // Substitua updatedProduct.id pelo ID do item da productList que você está atualizando
    //         data: {
    //           product: {
    //             update: updateProduct.product,
    //           },
    //         },
    //       })),
    //     },
    //   },
    // })

    // return this.prisma.productList.update({
    //   where: {
    //     id: teste.id,
    //   },
    //   data: {
    //     product: {
    //       update: teste.product,
    //     },
    //   },
    //   include: {
    //     product: true,
    //   },
    // })

    // console.log('updateData', updateData)
    // return this.prisma.list.update({
    //   where: { id: listId },
    //   include: relations,
    //   data: {
    //     productList: {
    //       updateMany: updatedProductList.map((updateProduct) => ({
    //         where: { productId }, // Substitua updatedProduct.id pelo ID do item da productList que você está atualizando
    //         data: {
    //           product: {
    //             update: updateProduct.product,
    //           },
    //         },
    //       })),
    //     },
    //   },
    // data: {
    //   productList: {
    //     updateMany: updatedProductList.map((updateProduct) => ({
    //       where: { id: updateProduct.id }, // Substitua updatedProduct.id pelo ID do item da productList que você está atualizando
    //       data: {
    //         product: {
    //           update: {
    //             // ...updateProduct.product,
    //             price: updateProduct.product.price, // Atualize o campo price do objeto Product
    //             // quantity: updateProduct.quantity, // Atualize o campo quantity do objeto Product
    //             // quantityMeasure: updateProduct.quantityMeasure, // Atualize o campo quantityMeasure do objeto Product
    //           },
    //         },
    //       },
    //     })),
    //   },
    // },
    // })
    // const updateData: Prisma.ListUpdateInput = {
    //   ...updateProductList,
    // }
    // return this.prisma.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     ...updateData,
    //   },
    // })
  }
}
