import { ReturnUserDto } from 'src/user/dto/return-user.dto'

export interface ReturnLogin {
  user: ReturnUserDto
  accessToken: string
}
