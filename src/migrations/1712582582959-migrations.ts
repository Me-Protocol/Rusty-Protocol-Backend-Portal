import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712582582959 implements MigrationInterface {
    name = 'Migrations1712582582959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "auditTrail" DROP COLUMN "userName"`);
        // await queryRunner.query(`ALTER TABLE "auditTrail" DROP COLUMN "userEmail"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr(uuid_generate_v4()::text, 1, 6)`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT '0.984'`);
        await queryRunner.query(`ALTER TABLE "auditTrail" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "auditTrail" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT '1.2'`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT '0.09'`);
        await queryRunner.query(`ALTER TABLE "auditTrail" ADD CONSTRAINT "FK_937ad8131c534c271a556f4129f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auditTrail" DROP CONSTRAINT "FK_937ad8131c534c271a556f4129f"`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT 0.09`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT 1.2`);
        await queryRunner.query(`ALTER TABLE "auditTrail" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "auditTrail" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT 0.984`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr((uuid_generate_v4()), 1, 6)`);
        // await queryRunner.query(`ALTER TABLE "auditTrail" ADD "userEmail" character varying`);
        // await queryRunner.query(`ALTER TABLE "auditTrail" ADD "userName" character varying`);
    }

}
