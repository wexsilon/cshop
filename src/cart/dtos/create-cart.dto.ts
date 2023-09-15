import { ItemDto } from './item.dto';

export class CreateCartDto {
  userId: number;
  totalPrice: number;
  items: ItemDto[];
}
