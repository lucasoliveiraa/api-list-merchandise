import { Decimal } from '@prisma/client/runtime/library'
import { ReturnListProduct } from 'src/list-product/dto/return-list-product.dto'
import { ListEntity } from 'src/list/entities/list.entity'

export class ReturnList {
  id: string
  name: string
  description: string
  budget: Decimal
  dateInitialPurchased: Date | null
  dateCompletionPurchased: Date | null
  totalSpent: Decimal
  productList?: ReturnListProduct[]
  shoppingListId: string | null

  constructor(list: ListEntity) {
    this.id = list.id
    this.name = list.name
    this.description = list.description
    this.dateInitialPurchased = list.dateInitialPurchased
    this.dateCompletionPurchased = list.dateCompletionPurchased
    this.totalSpent = new Decimal(list.totalSpent)
    this.budget = new Decimal(list.budget)
    this.shoppingListId = list.shoppingListId
    this.productList = list.productList
      ? list.productList.map(
          (listProduct) => new ReturnListProduct(listProduct),
        )
      : undefined
  }
}
