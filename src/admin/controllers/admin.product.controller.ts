import {
  UseGuards,
  Controller,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { IsAdminGuard } from '../guards/is.admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  NotFoundProduct,
  UniqueProductName,
} from 'src/product/responses/error-response';
import { AdminArea } from '../responses/error-response';
import { UnauthenticatedUser } from 'src/auth/responses/error-response';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Adding a new product',
    description:
      'Using this path, the admin can add new products and display them on the website.',
  })
  @ApiBody({
    type: CreateProductDto,
    description:
      'By sending an object of CreateProductDto, you can add a new product to the website.',
  })
  @ApiCreatedResponse({
    type: Product,
    description:
      'If the product is successfully registered in the database, the information recorded in the database will be returned.',
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @ApiException(() => new AdminArea(), {
    description: 'If the user is not an admin, this error is sent.',
  })
  @ApiException(() => new UniqueProductName(), {
    description: 'If a product with this name exists, it returns this error.',
  })
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Delete product',
    description:
      'The admin can delete their desired product from the website through this path.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The ID of the product you want to delete.',
    example: 1,
  })
  @ApiOkResponse({
    type: Product,
    description:
      "If the product is successfully deleted from the website, the deleted product's information will be sent.",
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @ApiException(() => new AdminArea(), {
    description: 'If the user is not an admin, this error is sent.',
  })
  @ApiException(() => new NotFoundProduct(), {
    description:
      'If a product with this ID is not found, this error will be returned.',
  })
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @ApiOperation({
    summary: 'Update product details',
    description:
      "If a product's details need modification, you can perform this task using this path.",
  })
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The ID of the product you want to edit its details.',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Details of the product you want to edit.',
  })
  @ApiOkResponse({
    type: Product,
    description:
      'If the modification of the details is successful, the product will send the modified product details.',
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @ApiException(() => new AdminArea(), {
    description: 'If the user is not an admin, this error is sent.',
  })
  @ApiException(() => new NotFoundProduct(), {
    description:
      'If a product with this ID is not found, this error will be returned.',
  })
  @ApiException(() => new UniqueProductName(), {
    description: 'If a product with this name exists, it returns this error.',
  })
  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
}
