import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { ProductRepository } from './repositories/product.repository'
import { ProductEntity } from './entities/product.entity'
import { CreateProductDto } from './dto/createProduct.dto'
import { UpdateProduct } from './dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(
    productId?: number[],
    isFindRelations?: boolean,
  ): Promise<ProductEntity[]> {
    const products = await this.productRepository.findAll(
      productId,
      isFindRelations,
    )
    console.log('====> ', products)

    if (!products || products.length === 0) {
      throw new NotFoundException('Not found products')
    }

    return products
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProduct.categoryId)
    return this.productRepository.create(createProduct)
  }

  async findProductById(
    productId: string,
    isRelations?: boolean,
  ): Promise<ProductEntity> {
    console.log('awdawdawdawdaw')
    console.log('findProductById', productId, isRelations)
    const product = await this.productRepository.findProductById(
      productId,
      isRelations,
    )

    if (!product) {
      throw new NotFoundException(`Product id: ${productId} not found`)
    }

    return product
  }

  async deleteProduct(
    productId: string,
  ): Promise<{ message: string; statusCode: number }> {
    await this.findProductById(productId)

    await this.productRepository.delete(productId)
    return {
      message: 'Produto excluído com sucesso',
      statusCode: HttpStatus.OK,
    }
  }

  async updateProduct(
    updateProduct: UpdateProduct,
    productId: string,
  ): Promise<ProductEntity> {
    await this.findProductById(productId)

    return this.productRepository.update(updateProduct, productId)
  }
}
