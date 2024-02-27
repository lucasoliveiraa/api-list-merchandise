import { IsDecimal, IsString } from 'class-validator'

export class CreateListDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsDecimal()
  budget: string
}
