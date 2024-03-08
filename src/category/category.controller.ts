import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from 'src/user/enum/user-type.enum'
import { CategoryService } from './category.service'
import { CreateCategory } from './dto/create-category.dto'
import { CategoryEntity } from './entities/category.entity'
import { ReturnCategory } from './dto/return-category.dto'
import { UpdateCategory } from './dto/update-category.dto'

@Controller('category')
@Roles(UserType.Admin, UserType.Root)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory)
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories()
  }

  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId)
  }

  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategory: UpdateCategory,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.editCategory(categoryId, updateCategory),
    )
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: string,
  ): Promise<ReturnCategory> {
    // return this.categoryService.findCategoryById(categoryId, true)
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId, true),
    )
  }
}
