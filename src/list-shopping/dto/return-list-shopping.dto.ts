import { ReturnList } from 'src/list/dto/return-list.dto'
import { ReturnProduct } from '../../product/dto/return-product.dto'
import { Decimal } from '@prisma/client/runtime/library'
import { QuantityMeasure } from '@utils/enum'
import { ListProductEntity } from '@/list-product/entities/list-product.entity'

export class ReturnListShopping {
  id: string
  price: Decimal | null
  quantity: number | null
  quantityMeasure: QuantityMeasure | null
  isPurchased: boolean
  listId: string
  productId: string
  product?: ReturnProduct
  list?: ReturnList

  constructor(listProduct: ListProductEntity) {
    this.id = listProduct.id
    this.productId = listProduct.productId
    this.price = listProduct.price
      ? new Decimal(listProduct.price)
      : listProduct.price
    this.quantity = listProduct.quantity
    this.quantityMeasure = listProduct.quantityMeasure
    this.isPurchased = listProduct.isPurchased
    this.product = listProduct.product
      ? new ReturnProduct(listProduct.product)
      : undefined
    this.list = listProduct.list ? new ReturnList(listProduct.list) : undefined
  }
}
