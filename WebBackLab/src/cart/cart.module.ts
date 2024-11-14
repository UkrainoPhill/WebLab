import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { DestinationEntity } from '../destinations/destination.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CartEntity, DestinationEntity])],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule {}