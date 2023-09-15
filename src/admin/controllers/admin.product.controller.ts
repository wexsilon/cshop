import {
  UseGuards,
  Controller,
  Post,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { IsAdminGuard } from '../guards/is.admin.guard';
import { AdminService } from '../admin.service';
import { UpdateProductDto } from 'src/product/dtos/update-product.dto';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(createProductDto: CreateProductDto) {
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
    updateProductDto: UpdateProductDto,
  ) {
    const beforeUpdate = await this.productService.findOneById(id);
    await this.productService.update(id, updateProductDto);
    return beforeUpdate;
  }
}
