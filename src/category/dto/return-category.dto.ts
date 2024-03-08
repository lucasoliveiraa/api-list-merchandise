import { ReturnProduct } from 'src/product/dto/return-product.dto'
import { CategoryEntity } from '../entities/category.entity'

export class ReturnCategory {
  name: string
  itens?: ReturnProduct[]

  constructor(categoryEntity: CategoryEntity) {
    this.name = categoryEntity.name
    this.itens = categoryEntity.itens
      ? categoryEntity.itens.map((item) => new ReturnProduct(item))
      : undefined
  }
}
