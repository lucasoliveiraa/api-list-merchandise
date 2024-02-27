import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateListDto } from './dto/createList.dto'
import { UserPayload } from 'src/guards/jwt.strategy'

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async createList(createList: CreateListDto, user: UserPayload) {
    const userId = user.sub
    await this.prisma.list.create({
      data: {
        ...createList,
        authorId: userId,
      },
    })
  }
}
