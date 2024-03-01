import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategory } from './dto/create-category.dto'
import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(createCategory: CreateCategory): Promise<any> {
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

    await this.prisma.category.create({
      data: createCategory,
    })
  }
}
