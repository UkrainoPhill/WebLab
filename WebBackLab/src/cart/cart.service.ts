import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DestinationEntity} from "../destinations/destination.entity";
import {Repository} from "typeorm";
import {CartEntity} from "./cart.entity";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private cartRepository: Repository<CartEntity>,
        @InjectRepository(DestinationEntity)
        private destinationRepository: Repository<DestinationEntity>,
    ) {}
    async createCart(amount: number, isHot: boolean, destinationId: string): Promise<CartEntity> {
        const destination = await this.destinationRepository.findOneBy({ id: destinationId });
        let cartItem = await this.cartRepository.findOne({where: {destination, isHot}})
        if (cartItem){
            cartItem.amount += amount;
            return this.cartRepository.save(cartItem);
        }
        const cart = this.cartRepository.create({ amount, isHot, destination });
        return this.cartRepository.save(cart);
    }

    async getCart(id: string): Promise<CartEntity> {
        return this.cartRepository.findOne({
            where: { id },
            relations: ['destination'],
        });
    }

    async getAllCarts(): Promise<CartEntity[]> {
        return this.cartRepository.find({
            relations: ['destination'],
        });    }

    async updateCart(id: string, amount: number, isHot: boolean, destinationId: string): Promise<CartEntity> {
        const cart = await this.cartRepository.findOneBy({ id });
        if (!cart) {
            throw new Error('Cart not found');
        }
        const destination = await this.destinationRepository.findOneBy({ id: destinationId });
        cart.amount = amount;
        cart.isHot = isHot;
        cart.destination = destination;
        return this.cartRepository.save(cart);
    }

    async deleteCart(id: string): Promise<void> {
        await this.cartRepository.delete({ id });
    }

}
