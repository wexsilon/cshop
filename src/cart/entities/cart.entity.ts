import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from './item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @ApiProperty({
    description:
      "The shopping cart's ID is stored in this field in the database.",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The user ID to which this shopping cart belongs.',
    example: 1,
  })
  @Column()
  userId: number;

  @ApiProperty({
    description:
      'Total amount of money the user needs to pay to complete the purchase.',
    example: 100,
  })
  @Column()
  totalPrice: number;

  @ApiProperty({
    description: "All the products that exist in the user's shopping cart.",
    type: [Item],
  })
  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];
}
