import { IsString, Max, Min } from 'class-validator'

export class UpdatePassword {
  @IsString({ message: 'Senha atual inválido' })
  @Max(20, { message: `Senha deve ter no máximo 20 caracteres` })
  @Min(6, { message: `Senha deve ter no mínimo 6 caracteres` })
  newPassword: string

  @IsString({ message: 'Senha anterior inválido' })
  lastPassword: string
}
