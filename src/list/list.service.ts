import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateListDto } from './dto/createList.dto'
import { ListEntity } from './entities/list.entity'
import { InsertList } from './dto/insert-list.dto'
import { ListRepository } from './repositories/list.repository'

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async createList(
    createList: CreateListDto,
    userId: string,
  ): Promise<ListEntity> {
    return this.listRepository.createList(createList, userId)
  }

  async insertProductList(
    insertList: InsertList,
    userId: string,
  ): Promise<void> {
    return this.listRepository.insertProductList(insertList, userId)
  }
}
