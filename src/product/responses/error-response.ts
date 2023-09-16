import { NotAcceptableException, NotFoundException } from '@nestjs/common';

export class UniqueProductName extends NotAcceptableException {
  constructor() {
    super('Another product with this name already exists in the database.');
  }
}

export class NotFoundProduct extends NotFoundException {
  constructor() {
    super('There is no product with this ID.');
  }
}
