import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateProductDto } from './dto/createProduct.dto'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from 'src/user/enum/user-type.enum'
import { ProductService } from './product.service'
import { ProductEntity } from './entities/product.entity'
import { ReturnProduct } from './dto/return-product.dto'

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll([], true)).map(
      (product) => new ReturnProduct(product),
    )
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    console.log(createProduct)
    return this.productService.createProduct(createProduct)
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId)
  }
}
