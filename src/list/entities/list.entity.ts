import { List } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ListProductEntity } from 'src/list-product/entities/list-product.entity'
import { UserEntity } from 'src/user/entities/user.entity'

export class ListEntity implements List {
  id: string
  name: string
  description: string
  budget: Decimal // POSSIVEL OPCIONAL
  dateInitialPurchased: Date | null
  dateCompletionPurchased: Date | null
  totalSpent: Decimal // POSSIVEL OPCIONAL
  userId: string
  createdAt: Date
  updatedAt: Date | null
  user?: UserEntity
  productList?: ListProductEntity[]
  shoppingListId: string | null
}
