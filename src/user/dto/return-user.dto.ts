import { UserEntity } from '../entities/user.entity'

export class ReturnUserDto {
  name: string
  email: string
  dateBirth: string
  phone: string
  typeUser: number

  constructor(userEntity: UserEntity) {
    this.name = userEntity.name
    this.email = userEntity.email
    this.dateBirth = userEntity.dateBirth
    this.phone = userEntity.phone
    this.typeUser = userEntity.typeUser
  }
}
