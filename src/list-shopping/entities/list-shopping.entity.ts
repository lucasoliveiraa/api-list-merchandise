import { ProductList } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ListEntity } from 'src/list/entities/list.entity'
import { ProductEntity } from 'src/product/entities/product.entity'
import { QuantityMeasure } from '@utils/enum'

export class ListShoppingEntity implements ProductList {
  id: string
  price: Decimal | null
  quantity: number | null
  quantityMeasure: QuantityMeasure | null
  isPurchased: boolean
  productId: string
  listId: string
  product?: ProductEntity
  list?: ListEntity
  createdAt: Date
  updatedAt: Date | null
}
