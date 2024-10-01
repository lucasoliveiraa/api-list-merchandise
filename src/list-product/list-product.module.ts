import { Module } from '@nestjs/common'
import { PrismaModule } from '@prisma/prisma.module'
import { ProductModule } from '@src/product/product.module'
import { ListProductService } from './list-product.service'
import { ListProductRepository } from './repositories/list-product.repository'

@Module({
  imports: [PrismaModule, ProductModule],
  providers: [ListProductService, ListProductRepository],
  exports: [ListProductService],
})
export class ListProductModule {}
