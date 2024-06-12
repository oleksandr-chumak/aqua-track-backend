import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedTemporaryUserEntity1717528984737 implements MigrationInterface {
    name = 'CreatedTemporaryUserEntity1717528984737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01a924b9a51a5e5a8385790622c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
