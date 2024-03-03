import { List } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class ListEntity implements List {
  id: string
  name: string
  description: string
  budget: Decimal
  authorId: string
  createdAt: Date
  updatedAt: Date | null
}
