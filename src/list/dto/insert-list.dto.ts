import { IsNumber } from 'class-validator'

export class InsertList {
  @IsNumber()
  productId: number

  @IsNumber()
  amount: number
}
