import { ReturnCategory } from './dto/return-category.dto'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategory } from './dto/create-category.dto'
import { CategoryEntity } from './entities/category.entity'
import { UpdateCategory } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const { name } = createCategory
    const categoryExists = await this.prisma.category
      .findFirst({
        where: {
          name,
        },
      })
      .catch(() => undefined)

    if (categoryExists) {
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
          itens: true,
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

    return category
  }

  async deleteCategory(categoryId: string): Promise<CategoryEntity> {
    const category = await this.findCategoryById(categoryId, true)

    if (category && category.itens && category.itens.length > 0) {
      throw new BadRequestException('Category with relations.')
    }

    return this.prisma.category.delete({ where: { id: categoryId } })
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
