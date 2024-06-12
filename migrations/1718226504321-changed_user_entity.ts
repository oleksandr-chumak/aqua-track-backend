import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedUserEntity1718226504321 implements MigrationInterface {
    name = 'ChangedUserEntity1718226504321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "weight" TYPE numeric(5,2)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "water_consumption" TYPE numeric(4,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "water_consumption" TYPE numeric(2,2)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "weight" TYPE numeric(3,2)`);
    }

}
