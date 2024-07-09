import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { PrismaModule } from '@prisma/prisma.module'
import { ProductRepository } from './repositories/product.repository'
import { CategoryModule } from '@/category/category.module'

@Module({
  imports: [PrismaModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
