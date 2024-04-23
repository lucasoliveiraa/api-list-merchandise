import { User } from '@prisma/client'
import { ListEntity } from 'src/list/entities/list.entity'

export class UserEntity implements User {
  id: string
  name: string
  password: string
  email: string
  dateBirth: string | null
  phone: string | null
  cpf: string | null
  typeUser: number
  createdAt: Date
  updatedAt: Date | null
  lists?: ListEntity[]
  // subscriptions?: SubscriptionEntity
}
