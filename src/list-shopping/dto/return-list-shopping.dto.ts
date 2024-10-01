import { ReturnList } from 'src/list/dto/return-list.dto'
import { ListShoppingEntity } from '../entities/list-shopping.entity'

export class ReturnListShopping {
  id: string
  month: number
  year: number
  userId: string
  lists?: ReturnList[]
  // price: Decimal | null
  // quantity: number | null
  // quantityMeasure: QuantityMeasure | null
  // isPurchased: boolean
  // listId: string
  // productId: string
  // product?: ReturnProduct
  // list?: ReturnList

  constructor(listShopping: ListShoppingEntity) {
    this.id = listShopping.id
    this.month = listShopping.month
    this.year = listShopping.year
    this.userId = listShopping.userId
    this.lists = listShopping.lists
      ? listShopping.lists.map((lista) => new ReturnList(lista))
      : undefined
  }
}
