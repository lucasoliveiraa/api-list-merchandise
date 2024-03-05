import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateProfileUser extends PartialType(
  OmitType(CreateUserDto, ['cpf', 'email', 'password'] as const),
) {}
