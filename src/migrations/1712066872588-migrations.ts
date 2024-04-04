import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712066872588 implements MigrationInterface {
    name = 'Migrations1712066872588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr(uuid_generate_v4()::text, 1, 6)`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT '0.984'`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT '1.2'`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT '0.09'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT 0.09`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT 1.2`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT 0.984`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr((uuid_generate_v4()), 1, 6)`);
    }

}
