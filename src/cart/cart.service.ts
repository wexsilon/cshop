import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Cart } from './entities/cart.entity';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { ProductNotExistCart, QuantityProductUnavailable } from './responses/error-response';
import { UpdateItemDto } from './dtos/update-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly productService: ProductService,
  ) {}

  async createCart(
    userId: number,
    product: Product,
    quantity: number,
    subTotalPrice: number,
  ) {
    const newItem = await this.itemRepository.save({
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity,
      subTotalPrice: subTotalPrice,
    });
    const newCart = this.cartRepository.create({
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
    const cart = await this.getCart(userId);
    await this.cartRepository.delete({ userId });
    return cart;
  }

  private recalculateCart(cart: Cart) {
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.quantity * item.price;
    });
  }

  async addItemToCart(userId: number, itemDto: CreateItemDto) {
    const { productId, quantity } = itemDto;
    const product = await this.productService.findOneById(productId);

    if (product.count < quantity) {
      throw new QuantityProductUnavailable(product.count);
    }

    const subTotalPrice = quantity * product.price;

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
          name: product.name,
          price: product.price,
        });
        cart.items.push(newItem);
        this.recalculateCart(cart);
        return this.cartRepository.save(cart);
      }
    } else {
      const newCart = await this.createCart(
        userId,
        product,
        quantity,
        subTotalPrice,
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
      if (cart.items.length > 0) this.cartRepository.save(cart);
      else this.cartRepository.remove(cart);
      return this.getCart(userId);
    } else {
      throw new ProductNotExistCart();
    }
  }

  async updateItem(
    userId: number,
    itemId: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id: itemId });
    if (item) {
      item.quantity = updateItemDto.quantity;
      this.itemRepository.save(item);
      return this.getCart(userId);
    }
  }
}
