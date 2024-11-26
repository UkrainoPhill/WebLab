// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { DestinationEntity } from '../destinations/destination.entity';
import { UserEntity } from '../auth/user.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, DestinationEntity, UserEntity]),
    AuthModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
