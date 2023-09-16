import { NotAcceptableException, NotFoundException } from '@nestjs/common';

export class QuantityProductUnavailable extends NotAcceptableException {
  constructor(count: number) {
    super(
      `The quantity of the product you desire is not available, and only ${count} are left.`,
    );
  }
}

export class ProductNotExistCart extends NotFoundException {
  constructor() {
    super('This product is not in your shopping cart.');
  }
}
