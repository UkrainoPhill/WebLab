import { DestinationEntity } from './destinations/destination.entity';
import { DataSource } from 'typeorm';
import { DestinationMigration1729717350861 } from './migrations/1729717350861-DestinationMigration';
import { CartEntity } from './cart/cart.entity';
import { AddCart1731362479938 } from './migrations/1731362479938-AddCart';
import { UserEntity } from './auth/user.entity';
import { Migrations1732044824810 } from './migrations/1732044824810-migrations';
import { UserCart1732637250006 } from './migrations/1732637250006-UserCart.ts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'weblabdb',
  synchronize: false,
  logging: true,
  entities: [DestinationEntity, CartEntity, UserEntity],
  migrations: [
    DestinationMigration1729717350861,
    AddCart1731362479938,
    Migrations1732044824810,
    UserCart1732637250006,
  ],
});
