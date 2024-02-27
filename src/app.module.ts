import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ListModule } from './list/list.module';
import { ProductModule } from './product/product.module';

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
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
