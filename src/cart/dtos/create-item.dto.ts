import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The ID of the product you want to add to the shopping cart.',
    example: 100,
  })
  productId: number;

  @ApiProperty({
    description:
      'The quantity of a specific product that the user intends to purchase.',
    example: 100,
  })
  quantity: number;
}
