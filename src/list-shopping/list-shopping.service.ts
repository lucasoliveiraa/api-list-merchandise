import { Injectable, NotFoundException } from '@nestjs/common'
import { ListShoppingRepository } from './repositories/list-shopping.repository'
import { ListShoppingEntity } from './entities/list-shopping.entity'

@Injectable()
export class ListShoppingService {
  constructor(
    private readonly listShoppingRepository: ListShoppingRepository,
  ) {}

  // async verifyProductInList(productId: string, listId: string) {}

  async findUserByShoppingList(
    userId: string,
    month: number,
    year: number,
  ): Promise<ListShoppingEntity> {
    console.log('======', userId, month, year)
    const user = await this.listShoppingRepository.findUserByShoppingList(
      userId,
      month,
      year,
    )

    console.log('=====> USER MONTH', user)

    if (!user) {
      // throw new NotFoundException(`UserId: ${userId} not found`)
      throw new NotFoundException(
        `No shopping lists found for UserId: ${userId} in ${month}/${year}`,
      )
    }

    return user
  }
}
