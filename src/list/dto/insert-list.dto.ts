import { IsNumber, IsOptional, IsString } from 'class-validator'

export class InsertList {
  @IsString()
  productId: string
}
