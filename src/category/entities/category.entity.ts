import { Category } from '@prisma/client'
import { ReturnProduct } from 'src/product/dto/return-product.dto'

export class CategoryEntity implements Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date | null
  itens?: ReturnProduct[]
}
