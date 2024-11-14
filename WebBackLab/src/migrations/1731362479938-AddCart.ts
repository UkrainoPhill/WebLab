import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCart1731362479938 implements MigrationInterface {
    name = 'AddCart1731362479938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "isHot" boolean NOT NULL, "destinationId" uuid, CONSTRAINT "PK_7ec8a182dc29da3b1df23408149" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_37f42d0493ce606a258f9667a2e" FOREIGN KEY ("destinationId") REFERENCES "destination_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_37f42d0493ce606a258f9667a2e"`);
        await queryRunner.query(`DROP TABLE "cart_entity"`);
    }

}
