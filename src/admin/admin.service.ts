import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';

import { ProductService } from 'src/product/product.service';

@Injectable()
export class AdminService {
  //  constructor(private readonly productService: ProductService) {}
  // createProduct(createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }
}
