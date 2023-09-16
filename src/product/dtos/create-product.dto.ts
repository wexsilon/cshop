import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The product name goes in this field.',
    example:
      "SweatyRocks Women's Striped Elastic High Waist Slim Fit Loose Casual Long Pants",
  })
  name: string;

  @ApiProperty({
    description: 'The product description is placed in this field.',
    example:
      'This dress pants has a professional look with its straight leg, elastic waist and 2 slant pockets. The 2 functional pockets design of this wide leg dress pants not only leaves room for you to store essential things, but also makes you look more professional and trendy by wearing this work pants. Dress Pants Women/ Work Pants for Women/ Slacks for Women High Waisted/ Black Wide Leg Dress Pants for Women/ Business Professional Attire Women/ Womens Business Casual Pants/ Womens Office Pants/ Dress Yoga Pants For The Office/ Women Office Pants/ Work Slacks For Women/ Professional Pants For Women For Work ',
  })
  description: string;

  @ApiProperty({
    description: 'The number of products in stock.',
    example: 5,
  })
  count: number;

  @ApiProperty({
    description: 'Enter the product price in this field.',
    example: 20,
  })
  price: number;
}
