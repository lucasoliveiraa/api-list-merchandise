import { CategoryEntity } from '../entities/category.entity'

export class ReturnCategory {
  name: string

  constructor(categoryEntity: CategoryEntity) {
    this.name = categoryEntity.name
  }
}
