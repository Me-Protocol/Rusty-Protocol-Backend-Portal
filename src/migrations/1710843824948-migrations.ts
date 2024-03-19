import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710843824948 implements MigrationInterface {
    name = 'Migrations1710843824948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auditTrail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "auditType" character varying NOT NULL, "description" character varying NOT NULL, "reportableId" character varying NOT NULL, CONSTRAINT "PK_f4f4f52d3a0d7746902dd76a597" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "auditTrail"`);
    }

}
