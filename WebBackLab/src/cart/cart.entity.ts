import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DestinationEntity} from "../destinations/destination.entity";

@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column("integer")
    amount: number;
    @Column("boolean")
    isHot: boolean;
    @ManyToOne(() => DestinationEntity, destination => destination.cart)
    destination: DestinationEntity;
}