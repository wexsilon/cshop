import { Injectable } from '@nestjs/common';

import { ProductService } from 'src/product/product.service';

@Injectable()
export class AdminService {
  constructor(private readonly productService: ProductService) {}
}
