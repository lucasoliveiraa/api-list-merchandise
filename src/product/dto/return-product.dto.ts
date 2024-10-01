import { Decimal } from '@prisma/client/runtime/library'
import { ProductEntity } from '../entities/product.entity'
import { ReturnCategory } from 'src/category/dto/return-category.dto'

export class ReturnProduct {
  id: string
  name: string
  price: Decimal | null
  description: string
  image: string
  quantity: number | null
  quantityMeasure: string | null
  barcode: string
  // categoryId: string
  category?: ReturnCategory

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id
    this.name = productEntity.name
    this.price = productEntity.price
    this.description = productEntity.description
    this.image = productEntity.image
    this.quantity = productEntity.quantity
    this.quantityMeasure = productEntity.quantityMeasure
    this.barcode = productEntity.barcode
    // this.categoryId = productEntity.categoryId
    this.category = productEntity.category
      ? new ReturnCategory(productEntity.category)
      : undefined
  }
}
