import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateProductDto } from './createProduct.dto'

export class UpdateProduct extends PartialType(
  OmitType(CreateProductDto, [] as const),
) {}
