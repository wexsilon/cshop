import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProduct() {
    return this.productService.findAll();
  }

  @Get(':id')
  getSingleProduct(@Param('id') id: number) {
    return this.productService.findOneById(id);
  }
}
