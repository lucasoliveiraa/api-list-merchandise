import { Module } from '@nestjs/common'
import { PrismaModule } from '@prisma/prisma.module'
import { ListShoppingService } from './list-shopping.service'

@Module({
  imports: [PrismaModule],
  providers: [ListShoppingService],
  exports: [ListShoppingService],
})
export class ListShoppingModule {}
