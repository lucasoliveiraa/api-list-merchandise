import { ItemList } from '@prisma/client'

export class ListItemEntity implements ItemList {
  id: string
  itemId: string
  listId: string
}
