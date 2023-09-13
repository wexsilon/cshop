import {
  UseGuards,
  Controller,
  Post,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { IsAdminGuard } from '../guard/is.admin.guard';
import { AdminService } from '../admin.service';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@UseGuards(JwtAuthGuard, IsAdminGuard)
@Controller('admin/product')
export class AdminProductController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  addProduct(createProductDto: CreateProductDto) {}

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {}

  @Patch(':id')
  updateProduct(@Param('id') id: number, updateProductDto: UpdateProductDto) {}
}
