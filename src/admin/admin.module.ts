import { Module } from '@nestjs/common';

import { ProductModule } from 'src/product/product.module';
import { AdminProductController } from './controllers/admin.product.controller';

@Module({
  imports: [ProductModule],
  controllers: [AdminProductController],
})
export class AdminModule {}
