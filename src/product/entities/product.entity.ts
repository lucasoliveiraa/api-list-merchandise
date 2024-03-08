import { Item } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CategoryEntity } from 'src/category/entities/category.entity'

export class ProductEntity implements Item {
  id: string
  name: string
  description: string
  image: string
  quantity: string
  quantityMeasure: string
  price: Decimal
  barcode: string
  createdAt: Date
  updatedAt: Date | null
  categoryId: string
  category?: CategoryEntity
}
