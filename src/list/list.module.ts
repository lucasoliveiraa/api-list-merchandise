import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ListController } from './list.controller'
import { ListService } from './list.service'
import { ListRepository } from './repositories/list.repository'

@Module({
  imports: [PrismaModule],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
