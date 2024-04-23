import { ListEntity } from 'src/list/entities/list.entity'
import { UserEntity } from '../entities/user.entity'
import { ReturnListDto } from 'src/list/dto/return-list.dto'

export class ReturnUserDto {
  name: string
  email: string
  cpf: string | null
  dateBirth: string | null
  phone: string | null
  typeUser: number
  lists?: ListEntity[]

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name
    this.email = userEntity.email
    this.cpf = userEntity.cpf
    this.dateBirth = userEntity.dateBirth
    this.phone = userEntity.phone
    this.typeUser = userEntity.typeUser
    // this.lists = userEntity.lists
    //   ? userEntity.lists.map((list) => ({
    //       id: list.id,
    //       name: list.name,
    //       description: list.description,
    //       budget: list.budget,
    //       authorId: list.authorId,
    //       createdAt: list.createdAt,
    //       updatedAt: list.updatedAt,
    //     }))
    //   : undefined
    this.lists = userEntity.lists
    //   ? userEntity.lists?.map((listUsers) => new ReturnListDto(listUsers))
    //   : undefined
  }
}
