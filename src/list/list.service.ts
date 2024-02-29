import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateListDto } from './dto/createList.dto'

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async createList(createList: CreateListDto, userId: string) {
    await this.prisma.list.create({
      data: {
        ...createList,
        authorId: userId,
      },
    })
  }
}
