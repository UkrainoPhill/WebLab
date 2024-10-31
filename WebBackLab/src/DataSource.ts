import {DestinationEntity} from "./destinations/destination.entity";
import {DataSource, DataSourceOptions} from "typeorm";
import {DestinationMigration1729717350861} from "./migrations/1729717350861-DestinationMigration";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "weblabdb",
    synchronize: false,
    logging: true,
    entities: [DestinationEntity],
    migrations: [DestinationMigration1729717350861]
})