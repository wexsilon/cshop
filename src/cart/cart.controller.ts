import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Cart } from './entities/cart.entity';
import {
  ProductNotExistCart,
  QuantityProductUnavailable,
} from './responses/error-response';
import { UnauthenticatedUser } from 'src/auth/responses/error-response';
import { NotFoundProduct } from 'src/product/responses/error-response';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Getting the shopping cart',
    description:
      "By sending a request to this path, it returns the user's shopping cart.",
  })
  @ApiOkResponse({
    type: Cart,
    description:
      'If everything goes correctly, an instance of the Cart class will be returned.',
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @Get()
  async getCart(@Req() req) {
    return (await this.cartService.getCart(req.user.id)) ?? {};
  }

  @ApiOperation({
    summary: 'Adding a product to the shopping cart.',
    description:
      'You can add a new product to your shopping cart by sending the required product information.',
  })
  @ApiBody({
    type: CreateItemDto,
    description:
      'To add a product to the shopping cart, you need to send an object of the CreateItemDto class.',
  })
  @ApiCreatedResponse({
    type: Cart,
    description:
      'If the product is successfully added to the shopping cart, an object of the Cart class is returned.',
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @ApiException(() => new NotFoundProduct(), {
    description:
      'If a product with this ID is not found, this error will be returned.',
  })
  @ApiException(() => new QuantityProductUnavailable(0), {
    description:
      'If the quantity of the product you want to add to the shopping cart exceeds the remaining stock, this error is returned.',
  })
  @Post()
  addItemToCart(@Req() req, @Body() itemDto: CreateItemDto) {
    return this.cartService.addItemToCart(req.user.id, itemDto);
  }

  @ApiOperation({
    summary: 'Removing a product from the shopping cart.',
    description:
      'You can delete a saved product in the shopping cart using this path.',
  })
  @ApiParam({
    type: Number,
    name: 'productId',
    description:
      'The ID of the product you want to remove from the shopping cart.',
    example: 1,
  })
  @ApiOkResponse({
    type: Cart,
    description:
      'If the product is successfully removed from the shopping cart, it returns the information of the updated shopping cart.',
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @ApiException(() => new ProductNotExistCart(), {
    description:
      'If you try to delete a product that is not in your shopping cart, an error will be returned.',
  })
  @Delete('item/:productId')
  removeItemFromCart(
    @Req() req,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeItemFromCart(req.user.id, productId);
  }

  @ApiOperation({
    summary: 'Changing the quantity of the product.',
    description: 'You can change the quantity of the product using this path.',
  })
  @ApiParam({
    type: Number,
    name: 'itemId',
    description:
      'The ID of the item you want to change the quantity of the product for.',
    example: 1,
  })
  @ApiBody({
    type: UpdateItemDto,
    description:
      'By sending an object of the UpdateItemDto class, you can change the quantity of the product.',
  })
  @ApiOkResponse({
    description:
      'If the change in the quantity of the product is successful, it sends the updated shopping cart as output.',
    type: Cart,
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @Patch('item/:itemId')
  modifyItemFromCart(
    @Req() req,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(req.user.id, itemId, updateItemDto);
  }

  @ApiOperation({
    summary: 'Delete shopping cart',
    description: 'You can delete your shopping cart using this path.',
  })
  @ApiOkResponse({
    type: Cart,
    description:
      'If the shopping cart is successfully deleted, it returns the deleted shopping cart.',
  })
  @ApiException(() => new UnauthenticatedUser(), {
    description: 'If the user is not authenticated, this error is returned.',
  })
  @Delete()
  deleteCart(@Req() req) {
    return this.cartService.deleteCart(req.user.id);
  }
}
