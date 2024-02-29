import { User } from '@prisma/client'

export class UserEntity implements User {
  id: string
  name: string
  password: string
  email: string
  dateBirth: string
  phone: string
  cpf: string
  typeUser: number
  createdAt: Date
  updatedAt: Date | null
}
