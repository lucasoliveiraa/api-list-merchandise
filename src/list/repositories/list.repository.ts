import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ListEntity } from '../entities/list.entity'
import { CreateListDto } from '../dto/createList.dto'
import { InsertList } from '../dto/insert-list.dto'

@Injectable()
export class ListRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createList(
    createList: CreateListDto,
    userId: string,
  ): Promise<ListEntity> {
    return this.prisma.list.create({
      data: {
        ...createList,
        userId,
      },
    })
  }

  async insertProductList(
    insertList: InsertList,
    userId: string,
  ): Promise<void> {
    const list = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    console.log(list, insertList)
  }
}
