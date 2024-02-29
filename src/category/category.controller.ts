import { Body, Controller, Post } from '@nestjs/common'
import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id.decorator'
import { UserType } from 'src/user/enum/user-type.enum'

@Controller('category')
@Roles(UserType.User)
export class CategoryController {
  @Roles(UserType.User)
  @Post()
  async createCategory(@UserId() userId: string) {
    return `ok ${userId}`
  }
}
