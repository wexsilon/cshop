import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { Item } from './entities/item.entity';
import { ItemDto } from './dtos/item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async createCart(
    userId: number,
    itemDto: ItemDto,
    subTotalPrice: number,
    totalPrice: number,
  ) {
    const newItem = await this.itemRepository.save({
      ...itemDto,
      subTotalPrice,
    });
    const newCart = this.cartRepository.create({
      totalPrice,
      userId,
      items: [newItem],
    });
    this.recalculateCart(newCart);
    return this.cartRepository.save(newCart);
  }

  getCart(userId: number) {
    return this.cartRepository.findOne({
      where: {
        userId,
      },
      relations: {
        items: true,
      },
    });
  }

  async deleteCart(userId: number) {
    return this.cartRepository.delete({ userId });
  }

  private recalculateCart(cart: Cart) {
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.quantity * item.price;
    });
  }

  async addItemToCart(userId: number, itemDto: ItemDto): Promise<Cart> {
    const { productId, quantity, price } = itemDto;
    const subTotalPrice = quantity * price;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        const item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;
        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return this.cartRepository.save(cart);
      } else {
        const newItem = await this.itemRepository.save({
          ...itemDto,
          subTotalPrice,
        });
        cart.items.push(newItem);
        this.recalculateCart(cart);
        return this.cartRepository.save(cart);
      }
    } else {
      const newCart = await this.createCart(
        userId,
        itemDto,
        subTotalPrice,
        price,
      );
      return newCart;
    }
  }

  async removeItemFromCart(userId: number, productId: number) {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId,
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      if (cart.items.length > 0) return this.cartRepository.save(cart);
      else return this.deleteCart(userId);
    }
  }
}
