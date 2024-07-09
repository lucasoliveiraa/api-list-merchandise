import { ReturnProduct } from 'src/product/dto/return-product.dto'
import { CategoryEntity } from '../entities/category.entity'

export class ReturnCategory {
  name: string
  products?: ReturnProduct[]

  constructor(categoryEntity: CategoryEntity) {
    this.name = categoryEntity.name
    this.products = categoryEntity.products
      ? categoryEntity.products.map((product) => new ReturnProduct(product))
      : undefined
  }
}
