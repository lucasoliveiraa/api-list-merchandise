import { List } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ListItemEntity } from 'src/list-item/entities/list.entity'
import { UserEntity } from 'src/user/entities/user.entity'

export class ListEntity implements List {
  id: string
  name: string
  description: string
  budget: Decimal
  userId: string
  createdAt: Date
  updatedAt: Date | null
  author?: UserEntity
  itemList?: ListItemEntity[]
}
