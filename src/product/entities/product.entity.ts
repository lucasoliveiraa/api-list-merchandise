import { Product } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CategoryEntity } from 'src/category/entities/category.entity'
import { QuantityMeasure } from '@utils/enum'

export class ProductEntity implements Product {
  id: string
  name: string
  description: string
  image: string
  quantity: number | null
  quantityMeasure: QuantityMeasure | null
  price: Decimal | null
  barcode: string
  createdAt: Date
  updatedAt: Date | null
  categoryId: string
  category?: CategoryEntity
}
