import { ItemList } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ListItemEntity } from 'src/list-item/entities/list.entity'
import { ListEntity } from 'src/list/entities/list.entity'

export class ReturnListDto {
  name: string
  description: string
  budget: Decimal
  userId: string
  itemList?: ItemList[]

  constructor(listEntity: ListEntity) {
    this.name = listEntity.name
    this.description = listEntity.description
    this.budget = new Decimal(listEntity.budget)
    this.userId = listEntity.userId
    this.itemList = listEntity.itemList
  }
}
