import { IsEmail, Max, IsPhoneNumber, IsString, Min } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail(undefined, { message: 'E-mail inválido' })
  email: string

  @IsString()
  dateBirth: string

  @IsString()
  @IsPhoneNumber('BR', { message: 'Telefone inválido' })
  phone: string

  @IsString({ message: 'CPF inválido' })
  @Max(11, { message: `deve ter no máximo 11 caracteres` })
  @Min(11, { message: `deve ter no mínimo 11 caracteres` })
  cpf: string

  @IsString()
  @Max(20, { message: `Senha deve ter no máximo 20 caracteres` })
  @Min(6, { message: `Senha deve ter no mínimo 6 caracteres` })
  password: string
}
