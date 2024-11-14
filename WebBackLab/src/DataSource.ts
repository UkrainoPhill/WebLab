import {DestinationEntity} from "./destinations/destination.entity";
import {DataSource, DataSourceOptions} from "typeorm";
import {DestinationMigration1729717350861} from "./migrations/1729717350861-DestinationMigration";
import {CartEntity} from "./cart/cart.entity";
import {AddCart1731362479938} from "./migrations/1731362479938-AddCart";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "weblabdb",
    synchronize: false,
    logging: true,
    entities: [DestinationEntity, CartEntity],
    migrations: [DestinationMigration1729717350861, AddCart1731362479938]
})