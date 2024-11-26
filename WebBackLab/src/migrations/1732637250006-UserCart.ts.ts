import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCart1732637250006 implements MigrationInterface {
  name = 'UserCart1732637250006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart_entity" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_8edda4b36869b45de9624747e8a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_8edda4b36869b45de9624747e8a"`,
    );
    await queryRunner.query(`ALTER TABLE "cart_entity" DROP COLUMN "userId"`);
  }
}
