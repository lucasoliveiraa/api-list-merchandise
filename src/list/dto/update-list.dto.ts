import { IsNumber, IsOptional, IsString } from 'class-validator'
import { QuantityMeasure } from '@utils/enum'

export class UpdateList {
  @IsNumber()
  @IsOptional()
  price?: number

  @IsNumber()
  @IsOptional()
  quantity?: number

  @IsString()
  @IsOptional()
  quantityMeasure?: QuantityMeasure
}
