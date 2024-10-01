import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaModule } from '@prisma/prisma.module'
import { UserRepository } from './repositories/user.repository'
import { ListShoppingModule } from '@src/list-shopping/list-shopping.module'

@Module({
  imports: [PrismaModule, ListShoppingModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
