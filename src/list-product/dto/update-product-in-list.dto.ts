import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateProductDto } from 'src/product/dto/createProduct.dto'

export class UpdateProductInList extends PartialType(
  OmitType(CreateProductDto, [] as const),
) {}
