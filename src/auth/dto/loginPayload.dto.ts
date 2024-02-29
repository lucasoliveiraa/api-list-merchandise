import { UserEntity } from './../../user/entities/user.entity'

export class LoginPayload {
  id: string
  typeUser: number

  constructor(user: UserEntity) {
    this.id = user.id
    this.typeUser = user.typeUser
  }
}
