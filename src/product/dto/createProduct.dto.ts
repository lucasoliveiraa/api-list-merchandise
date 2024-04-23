import { IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
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

  @IsNumber()
  price: number

  @IsString()
  barcode: string

  @IsString()
  categoryId: string
}
