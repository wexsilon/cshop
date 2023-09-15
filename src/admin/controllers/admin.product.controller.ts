import {
  UseGuards,
  Controller,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { IsAdminGuard } from '../guards/is.admin.guard';
import { AdminService } from '../admin.service';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';

import { ProductService } from 'src/product/product.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const deletedProduct = await this.productService.findOneById(id);
    await this.productService.delete(id);
    return deletedProduct;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.update(id, updateProductDto);
    return this.productService.findOneById(id);
  }
}
