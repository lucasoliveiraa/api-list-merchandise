import { Injectable } from '@nestjs/common'
import { ListShoppingRepository } from './repositories/list-product.repository'

@Injectable()
export class ListShoppingService {
  constructor(
    private readonly listShoppingRepository: ListShoppingRepository,
  ) {}

  async verifyProductInList(productId: string, listId: string) {}
}
