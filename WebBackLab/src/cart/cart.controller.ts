import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartEntity } from './cart.entity';
import { UpdateCartDto } from './dto/cart.update.input.dto';
import { CreateCartDto } from './dto/cart.create.input.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully created.',
    type: CartEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createCart(
    @Body() createCartDto: CreateCartDto,
    @Query('token') token: string,
  ): Promise<CartEntity> {
    return this.cartService.createCart(
      createCartDto.amount,
      createCartDto.isHot,
      createCartDto.destinationId,
      token,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully retrieved.',
    type: CartEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async getCart(@Param('id') id: string): Promise<CartEntity> {
    return this.cartService.getCart(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({
    status: 200,
    description: 'The carts have been successfully retrieved.',
    type: [CartEntity],
  })
  async getAllCarts(): Promise<CartEntity[]> {
    return this.cartService.getAllCarts();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cart by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully updated.',
    type: CartEntity,
  })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async updateCart(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Query('token') token: string,
  ): Promise<CartEntity> {
    return this.cartService.updateCart(
      id,
      updateCartDto.amount,
      updateCartDto.isHot,
      updateCartDto.destinationId,
      token,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cart has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async deleteCart(@Param('id') id: string): Promise<void> {
    return this.cartService.deleteCart(id);
  }

  @Get('user-carts')
  @ApiOperation({ summary: 'Get all carts for a user' })
  @ApiQuery({ name: 'token', type: String })
  @ApiResponse({
    status: 200,
    description: 'The carts have been successfully retrieved.',
    type: [CartEntity],
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserCarts(@Query('token') token: string): Promise<CartEntity[]> {
    return this.cartService.getUserCarts(token);
  }

  @Delete('user-carts')
  @ApiOperation({ summary: 'Delete all carts for a user' })
  @ApiQuery({ name: 'token', type: String })
  @ApiResponse({
    status: 200,
    description: 'All user carts have been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteAllUserCarts(@Query('token') token: string): Promise<void> {
    return this.cartService.deleteUserCarts(token);
  }
}
