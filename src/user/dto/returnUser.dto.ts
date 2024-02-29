import { UserEntity } from '../entities/user.entity'

export class ReturnUserDto {
  id: string
  name: string
  email: string
  dateBirth: string
  phone: string
  // cpf: string
  typeUser: number

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id
    this.name = userEntity.name
    this.email = userEntity.email
    this.dateBirth = userEntity.dateBirth
    this.phone = userEntity.phone
    // this.cpf = userEntity.cpf
    this.typeUser = userEntity.typeUser
  }
}
