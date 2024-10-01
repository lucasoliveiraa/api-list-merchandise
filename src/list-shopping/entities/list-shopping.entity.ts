import { ShoppingList } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ListEntity } from 'src/list/entities/list.entity'
import { ProductEntity } from 'src/product/entities/product.entity'
import { QuantityMeasure } from '@utils/enum'

export class ListShoppingEntity implements ShoppingList {
  id: string
  month: number
  year: number
  userId: string
  lists?: ListEntity[]
  createdAt: Date
  updatedAt: Date | null
  // price: Decimal | null
  // quantity: number | null
  // quantityMeasure: QuantityMeasure | null
  // isPurchased: boolean
  // productId: string
  // product?: ProductEntity
  // listId: string
}
