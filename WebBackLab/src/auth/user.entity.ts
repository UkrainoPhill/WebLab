import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from '../cart/cart.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  hashPassword: string;

  @Column('varchar')
  email: string;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}
