import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail(undefined, { message: 'E-mail inválido' })
  email: string

  @IsString()
  @MaxLength(20, { message: `Senha deve ter no máximo 20 caracteres` })
  @MinLength(6, { message: `Senha deve ter no mínimo 6 caracteres` })
  password: string
}
