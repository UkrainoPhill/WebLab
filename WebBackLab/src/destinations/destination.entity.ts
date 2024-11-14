import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ContinentEnum } from "./utils/ContinentEnum";
import {CartEntity} from "../cart/cart.entity";

@Entity()
export class DestinationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column("varchar")
    title: string;
    @Column("varchar")
    description: string;
    @Column("double precision")
    price: number;
    @Column({type: "enum", enum: ContinentEnum})
    continent: ContinentEnum;
    @Column("integer")
    rate: number;
    @Column("timestamp")
    last_updated: Date;
    @Column("varchar")
    image: string;
    @OneToMany(() => CartEntity, cart => cart.destination)
    cart: CartEntity[];
}