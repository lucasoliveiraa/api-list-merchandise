import { IsDecimal, IsNumber, IsString } from 'class-validator'

export class CreateListDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  budget: number
}
