import { Body, Controller, Post } from '@nestjs/common'
import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id.decorator'
import { UserType } from 'src/user/enum/user-type.enum'
import { CategoryService } from './category.service'
import { CreateCategory } from './dto/create-category.dto'
import { CategoryEntity } from './entities/category.entity'

@Controller('category')
@Roles(UserType.Admin, UserType.Root, UserType.User)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory)
  }
}
