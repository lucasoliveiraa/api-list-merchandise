import { IsEmail, IsNumber, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  dateBirth: string

  @IsString()
  phone: string

  @IsString()
  cpf: string

  @IsString()
  password: string
}