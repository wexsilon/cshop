import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { ItemDto } from './dtos/item.dto';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addItemToCart(@Req() req, @Body() itemDto: ItemDto) {
    return this.cartService.addItemToCart(req.user.id, itemDto);
  }

  @Delete('item/:productId')
  removeItemFromCart(@Req() req, @Param('productId') productId: number) {
    return this.cartService.removeItemFromCart(req.user.id, productId);
  }

  @Delete()
  deleteCart(@Req() req) {
    return this.cartService.deleteCart(req.user.id);
  }

}
