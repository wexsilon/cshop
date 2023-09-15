import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dtos/item.dto';
import { CreateCartDto } from './dtos/create-cart.dto';
import { Item } from './entities/item.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly productService: ProductService
  ) {}

  async createCart(userId: number, itemDto: ItemDto, subTotalPrice: number, totalPrice: number) {
    const product = await this.productService.findOneById(itemDto.productId);
    const newItem = await this.itemRepository.save({
      ...itemDto,
      name: product.name,
      subTotalPrice
    });
    return this.cartRepository.save({
      totalPrice,
      userId,
      items: [newItem]
    });
  }

  getCart(userId: number) {
    return this.cartRepository.findOneBy({ userId });
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
        const product = await this.productService.findOneById(itemDto.productId);
        const newItem = await this.itemRepository.save({
          ...itemDto,
          name: product.name,
          subTotalPrice,
        });
        cart.items.push(newItem);
        this.recalculateCart(cart);
        return this.cartRepository.save(cart);
      }
    } else {
      return this.createCart(userId, itemDto, subTotalPrice, price);
    }
  }
  async removeItemFromCart(userId: number, productId: number): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex((item) => item.productId == productId);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      this.cartRepository.save(cart);
      //return cart.save();
    }
  }

}
