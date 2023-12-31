import { ConfigService } from '@nestjs/config';

import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import { User } from './user/entities/user.entity';
import { EmailVerify } from './mail/entities/email.verify.entity';
import { Product } from './product/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { Item } from './cart/entities/item.entity';

export function typeormFactory(
  configService: ConfigService,
): SqliteConnectionOptions {
  return {
    type: 'sqlite',
    database: configService.get<string>('DB_NAME'),
    synchronize: true,
    entities: [User, EmailVerify, Product, Cart, Item],
  };
}
