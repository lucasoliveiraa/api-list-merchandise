import { Category } from '@prisma/client'
import { ProductEntity } from 'src/product/entities/product.entity'

export class CategoryEntity implements Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date | null
  products?: ProductEntity[]
}
