import { Injectable, NotFoundException } from '@nestjs/common'
import { InsertList } from 'src/list/dto/insert-list.dto'
import { ListProductEntity } from './entities/list-product.entity'
import { ProductService } from 'src/product/product.service'
import { ListEntity } from 'src/list/entities/list.entity'
import { ListProductRepository } from './repositories/list-product.repository'
import { DeleteResult } from 'typeorm'
import { UpdateList } from 'src/list/dto/update-list.dto'

@Injectable()
export class ListProductService {
  constructor(
    private readonly listProductRepository: ListProductRepository,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInList(
    productId: string,
    listId: string,
  ): Promise<ListProductEntity> {
    console.log('verifyProductInList', productId, listId)
    const listProduct = await this.listProductRepository.verifyProductInList(
      productId,
      listId,
    )
    console.log('listProduct', listProduct)

    if (!listProduct) {
      throw new NotFoundException('Product not found in list')
    }
    console.log('verifyProductInList listProduct', listProduct)

    return listProduct
  }

  async createProductInList(
    productId: string,
    listId: string,
  ): Promise<ListProductEntity | null> {
    return this.listProductRepository.createProductInList(productId, listId)
  }

  async insertProductInList(
    productId: string,
    list: ListEntity,
  ): Promise<ListProductEntity | null> {
    console.log('insertPRODUCTINLIST', productId)
    // await this.productService.findProductById(insertList.productId, true)

    const listProduct = await this.verifyProductInList(
      productId,
      list.id,
    ).catch(() => undefined)

    if (!listProduct) {
      return this.createProductInList(productId, list.id)
    }

    return this.listProductRepository.insertProductInList(listProduct)
  }

  async deleteProductList(
    listId: string,
    productId: string,
  ): Promise<DeleteResult> {
    return this.listProductRepository.delete(listId, productId)
  }

  async updateProductInList(
    listId: string,
    productId: string,
    updateList: UpdateList,
    list: ListEntity,
  ): Promise<ListEntity> {
    // console.log('updateProductInList', listId, productId, updateList, list)
    const updatedProductList = (list.productList || []).map((product) => {
      // console.log('PRODUCT', product)
      if (product.productId === productId) {
        return {
          ...product,
          product: {
            ...product.product,
            price: updateList.price,
            quantity: updateList.quantity,
            quantityMeasure: updateList.quantityMeasure,
          },
        }
      }
      // console.log('updateProductInList PRODUC', product)
      return product
    })
    // console.log(updatedProductList, 'updatedProductList')
    return this.listProductRepository.updateProductInList(
      productId,
      listId,
      updatedProductList,
      true,
    )

    // const updatedList = await this.prisma.list.update({
    //   where: { id: listId },
    //   data: {
    //     productList: {
    //       updateMany: updatedProductList,
    //     },
    //   },
    //   include: { productList: true },
    // })

    // return updatedList
    //   await this.productService.findProductById(updateList.productId)

    // const cartProduct = await this.verifyProductInCart(
    //   updateCart.productId,
    //   cart.id,
    // )

    // return this.cartProductRepository.save({
    //   ...cartProduct,
    //   amount: updateCart.amount,
    // })
    // const listProduct = await this.verifyProductInList(productId, listId).catch(
    //   () => undefined,
    // )

    // if (!listProduct) {
    //   throw new NotFoundException('Product not found in list')
    // }

    // return listProduct
  }
}
