import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundProduct } from './responses/error-response';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Product } from './entities/product.entity';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get details of all products',
    description:
      'You can retrieve information for all products using this path.',
  })
  @ApiOkResponse({
    type: [Product],
    description:
      'Information for all products is returned as an array of the Product class.',
  })
  @Get()
  getAllProduct() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Get product details',
    description:
      'You can retrieve all the information related to a product using this path.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the product you want to view the information for.',
    example: 1,
  })
  @ApiOkResponse({
    type: Product,
    description:
      'If the product exists in the database, its information will be returned.',
  })
  @ApiException(() => new NotFoundProduct(), {
    description:
      'If a product with this ID is not found, this error will be returned.',
  })
  @Get(':id')
  getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneById(id);
  }
}
