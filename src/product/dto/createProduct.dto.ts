import { IsNumber, IsOptional, IsString } from 'class-validator'
import { QuantityMeasure } from '@utils/enum'

export class CreateProductDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  image: string

  @IsString()
  @IsOptional()
  quantity?: number

  @IsString()
  @IsOptional()
  quantityMeasure?: QuantityMeasure

  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  barcode: string

  @IsString()
  categoryId: string
}
