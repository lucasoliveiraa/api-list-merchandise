import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ListModule } from './list/list.module'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './guards/roles.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ListModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
