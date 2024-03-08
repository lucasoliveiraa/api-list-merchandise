import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CategoryModule } from 'src/category/category.module'

@Module({
  imports: [PrismaModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
