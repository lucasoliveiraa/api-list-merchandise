import { ReturnCategory } from './dto/return-category.dto'
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { CreateCategory } from './dto/create-category.dto'
import { CategoryEntity } from './entities/category.entity'
import { UpdateCategory } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.prisma.category
      .findUnique({
        where: {
          name,
        },
      })
      .catch(() => undefined)

    if (!category) {
      throw new NotFoundException(`Category name ${name} not found`)
    }

    return category
  }

  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    )

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategory.name} exist`,
      )
    }

    return this.prisma.category.create({
      data: createCategory,
    })
  }

  async findAllCategories(): Promise<ReturnCategory[]> {
    const categories = await this.prisma.category.findMany()

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty')
    }

    return categories.map((category) => new ReturnCategory(category))
  }

  async findCategoryById(
    categoryId: string,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations
      ? {
          products: true,
        }
      : undefined

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: relations,
    })

    if (!category) {
      throw new NotFoundException(`Category id: ${categoryId} not found`)
    }
    console.log(category)
    return category
  }

  async deleteCategory(
    categoryId: string,
  ): Promise<{ message: string; statusCode: number }> {
    const category = await this.findCategoryById(categoryId, true)

    if (category && category.products && category.products.length > 0) {
      throw new BadRequestException('Category with relations.')
    }

    await this.prisma.category.delete({ where: { id: categoryId } })
    return {
      message: 'Categoria excluída com sucesso',
      statusCode: HttpStatus.OK,
    }
  }

  async editCategory(
    categoryId: string,
    updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    await this.findCategoryById(categoryId)

    return this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...updateCategory,
      },
    })
  }
}
