import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateListDto } from './dto/createList.dto'
import { ListEntity } from './entities/list.entity'
import { InsertList } from './dto/insert-list.dto'

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async createList(
    createList: CreateListDto,
    userId: string,
  ): Promise<ListEntity> {
    const teste = await this.prisma.list.create({
      data: {
        ...createList,
        authorId: userId,
      },
    })
    return teste
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
