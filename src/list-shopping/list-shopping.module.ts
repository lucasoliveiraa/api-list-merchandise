import { Module } from '@nestjs/common'
import { PrismaModule } from '@prisma/prisma.module'
import { ListShoppingService } from './list-shopping.service'
import { ListShoppingRepository } from './repositories/list-shopping.repository'

@Module({
  imports: [PrismaModule],
  providers: [ListShoppingService, ListShoppingRepository],
  exports: [ListShoppingService],
})
export class ListShoppingModule {}
