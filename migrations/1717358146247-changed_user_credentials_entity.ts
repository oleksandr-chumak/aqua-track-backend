import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedUserCredentialsEntity1717358146247 implements MigrationInterface {
    name = 'ChangedUserCredentialsEntity1717358146247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD "email_confirmation_code_valid_till" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD "reset_password_code" character varying`);
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD "reset_password_code_valid_till" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD "reset_password_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP COLUMN "reset_password_token"`);
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP COLUMN "reset_password_code_valid_till"`);
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP COLUMN "reset_password_code"`);
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP COLUMN "email_confirmation_code_valid_till"`);
    }

}
