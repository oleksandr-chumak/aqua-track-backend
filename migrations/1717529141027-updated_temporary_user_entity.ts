import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTemporaryUserEntity1717529141027 implements MigrationInterface {
    name = 'UpdatedTemporaryUserEntity1717529141027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temporary_users" ADD "client_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "temporary_users" ADD CONSTRAINT "UQ_99ed657a508121d83afd5d8cbed" UNIQUE ("client_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "temporary_users" DROP CONSTRAINT "UQ_99ed657a508121d83afd5d8cbed"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" DROP COLUMN "client_id"`);
    }

}
