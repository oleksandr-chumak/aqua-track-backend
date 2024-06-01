import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedUserCredentials1717240933832 implements MigrationInterface {
    name = 'ChangedUserCredentials1717240933832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD "email_confirmation_code" character varying`);
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD CONSTRAINT "UQ_dd0918407944553611bb3eb3ddc" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_credentials" ADD CONSTRAINT "FK_dd0918407944553611bb3eb3ddc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP CONSTRAINT "FK_dd0918407944553611bb3eb3ddc"`);
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP CONSTRAINT "UQ_dd0918407944553611bb3eb3ddc"`);
        await queryRunner.query(`ALTER TABLE "user_credentials" DROP COLUMN "email_confirmation_code"`);
    }

}
