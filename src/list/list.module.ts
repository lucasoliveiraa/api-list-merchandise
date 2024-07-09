import { Module } from '@nestjs/common'
import { PrismaModule } from '@prisma/prisma.module'
import { ListProductModule } from '@/list-product/list-product.module'
import { ListRepository } from './repositories/list.repository'
import { ListController } from './list.controller'
import { ListService } from './list.service'

@Module({
  imports: [PrismaModule, ListProductModule],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
