import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIsEmailConfirmedField1717272713993 implements MigrationInterface {
    name = 'AddedIsEmailConfirmedField1717272713993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP COLUMN "is_email_confirmed"`);
    }

}
