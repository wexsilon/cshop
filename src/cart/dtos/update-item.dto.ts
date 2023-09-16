import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({
    description:
      'The quantity of a specific product that the user intends to purchase.',
    example: 100,
  })
  quantity: number;
}
