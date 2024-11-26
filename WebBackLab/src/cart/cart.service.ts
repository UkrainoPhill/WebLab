import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationEntity } from '../destinations/destination.entity';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { UserEntity } from '../auth/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(DestinationEntity)
    private destinationRepository: Repository<DestinationEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}
  async createCart(
    amount: number,
    isHot: boolean,
    destinationId: string,
    token: string,
  ): Promise<CartEntity> {
    const destination = await this.destinationRepository.findOneBy({
      id: destinationId,
    });
    const username: string = this.authService.unpackJwt(token).username;
    const user = await this.userRepository.findOneBy({ username: username });
    const cartItem = await this.cartRepository.findOne({
      where: { destination, isHot, user },
    });
    if (cartItem) {
      cartItem.amount += amount;
      return this.cartRepository.save(cartItem);
    }
    const cart = this.cartRepository.create({
      amount,
      isHot,
      destination,
      user,
    });
    return this.cartRepository.save(cart);
  }

  async getCart(id: string): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({
      where: { id },
      relations: ['destination', 'user'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async getAllCarts(): Promise<CartEntity[]> {
    return this.cartRepository.find({
      relations: ['destination', 'user'],
    });
  }

  async updateCart(
    id: string,
    amount: number,
    isHot: boolean,
    destinationId: string,
    token: string,
  ): Promise<CartEntity> {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const destination = await this.destinationRepository.findOneBy({
      id: destinationId,
    });
    if (!destination) {
      throw new NotFoundException('Destination not found');
    }
    const username: string = this.authService.unpackJwt(token).username;
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    cart.amount = amount;
    cart.isHot = isHot;
    cart.destination = destination;
    cart.user = user;
    return this.cartRepository.save(cart);
  }

  async getUserCarts(token: string): Promise<CartEntity[]> {
    const username: string = this.authService.unpackJwt(token).username;
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.cartRepository.find({
      where: { user },
      relations: ['destination', 'user'],
    });
  }

  async deleteCart(id: string): Promise<void> {
    await this.cartRepository.delete({ id });
  }

  async deleteUserCarts(token: string): Promise<void> {
    const username: string = this.authService.unpackJwt(token).username;
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.cartRepository.delete({ user });
  }
}
