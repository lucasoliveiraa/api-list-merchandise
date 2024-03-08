import { Decimal } from '@prisma/client/runtime/library'
import { ProductEntity } from '../entities/product.entity'
import { ReturnCategory } from 'src/category/dto/return-category.dto'

export class ReturnProduct {
  name: string
  price: Decimal
  description: string
  image: string
  quantity: string
  quantityMeasure: string
  barcode: string
  categoryId: string
  category?: ReturnCategory

  constructor(productEntity: ProductEntity) {
    this.name = productEntity.name
    this.price = productEntity.price
    this.description = productEntity.description
    this.image = productEntity.image
    this.quantity = productEntity.quantity
    this.quantityMeasure = productEntity.quantityMeasure
    this.barcode = productEntity.barcode
    this.categoryId = productEntity.categoryId
    this.category = productEntity.category
      ? new ReturnCategory(productEntity.category)
      : undefined
  }
}
