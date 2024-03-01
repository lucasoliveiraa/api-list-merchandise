import { IsDecimal, IsOptional, IsString } from 'class-validator'

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

  @IsDecimal()
  price: number

  @IsString()
  barcode: string

  @IsString()
  categoryId: string

  @IsString()
  @IsOptional()
  listId: string
}
