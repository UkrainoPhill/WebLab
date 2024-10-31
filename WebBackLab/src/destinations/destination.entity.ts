import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ContinentEnum } from "./utils/ContinentEnum";

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
}