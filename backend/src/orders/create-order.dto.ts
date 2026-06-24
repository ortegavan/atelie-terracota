import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  IsPositive,
  IsNumber,
  Min,
} from 'class-validator';

export class OrderItemDto {
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsNotEmpty()
  productName!: string;

  @IsInt()
  @IsPositive()
  quantity!: number;

  @IsNumber()
  @Min(0.01)
  unitPrice!: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
}
