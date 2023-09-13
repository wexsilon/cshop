import { Module } from '@nestjs/common';

import { ProductModule } from 'src/product/product.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminProductController } from './controllers/admin.product.controller';

@Module({
  imports: [ProductModule],
  controllers: [AdminController, AdminProductController],
  providers: [AdminService],
})
export class AdminModule {}
