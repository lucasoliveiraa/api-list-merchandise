import { IsDecimal, IsString } from 'class-validator'

export class CreateProduct {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  image: string

  @IsString()
  quantity: string

  @IsString()
  quantityMeasure: string

  @IsDecimal()
  price: number

  @IsString()
  barcode: string
}
