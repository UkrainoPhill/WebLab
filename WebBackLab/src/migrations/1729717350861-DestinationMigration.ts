import { MigrationInterface, QueryRunner } from "typeorm";

export class DestinationMigration1729717350861 implements MigrationInterface {
    name = 'DestinationMigration1729717350861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."destination_entity_continent_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TABLE "destination_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "continent" "public"."destination_entity_continent_enum" NOT NULL, "rate" integer NOT NULL, "last_updated" TIMESTAMP NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_54f3f8af773788fd8c7642bf75f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "destination_entity"`);
        await queryRunner.query(`DROP TYPE "public"."destination_entity_continent_enum"`);
    }

}
