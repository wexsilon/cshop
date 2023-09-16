import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class Item {
  @ApiProperty({
    description: 'The ID of the item saved in the shopping cart.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The ID of each product represents it in the database.',
    example: 1,
  })
  @Column()
  productId: number;

  @ApiProperty({
    description: 'The product name goes in this field.',
    example:
      "SweatyRocks Women's Striped Elastic High Waist Slim Fit Loose Casual Long Pants",
  })
  @Column()
  name: string;

  @ApiProperty({
    description:
      'The quantity of a specific product that the user intends to purchase.',
    example: 4,
  })
  @Column()
  quantity: number;

  @ApiProperty({
    description:
      'The price of each product that exists in the database is placed in this field.',
    example: 20,
  })
  @Column()
  price: number;

  @ApiProperty({
    description:
      'The total price related to a specific product type that is in the shopping cart.',
    example: 80,
  })
  @Column()
  subTotalPrice: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
}
