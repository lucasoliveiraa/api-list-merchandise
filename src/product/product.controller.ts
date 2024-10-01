import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Roles } from '@decorators/roles.decorator'
import { ProductService } from './product.service'
import { ProductEntity } from './entities/product.entity'
import { CreateProductDto } from './dto/createProduct.dto'
import { ReturnProduct } from './dto/return-product.dto'
import { UpdateProduct } from './dto/update-product.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserType } from '@utils/enum'

@ApiTags('Product')
@ApiBearerAuth('access-token')
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
  @Get('/:productId')
  async findProductById(
    @Param('productId') productId: string,
  ): Promise<ReturnProduct> {
    return new ReturnProduct(
      await this.productService.findProductById(productId, true),
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

  @Roles(UserType.Admin, UserType.Root)
  @Put('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProduct,
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId)
  }
}
