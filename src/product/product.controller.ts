import { Body, Controller, Post } from '@nestjs/common'
import { CreateProductDto } from './dto/createProduct.dto'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from 'src/user/enum/user-type.enum'
import { ProductService } from './product.service'
import { ProductEntity } from './entities/product.entity'

@Roles(UserType.Admin, UserType.Root, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    console.log(createProduct)
    return this.productService.createProduct(createProduct)
  }
}
