import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712583285474 implements MigrationInterface {
    name = 'Migrations1712583285474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD "auditType" character varying`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr(uuid_generate_v4()::text, 1, 6)`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT '0.984'`);
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP CONSTRAINT "FK_3dae5775bdd4f991d6faa4dbe15"`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP COLUMN "reportableId"`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD "reportableId" character varying`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT '1.2'`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT '0.09'`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD CONSTRAINT "FK_3dae5775bdd4f991d6faa4dbe15" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP CONSTRAINT "FK_3dae5775bdd4f991d6faa4dbe15"`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT 0.09`);
        await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT 1.2`);
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP COLUMN "reportableId"`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD "reportableId" text`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD CONSTRAINT "FK_3dae5775bdd4f991d6faa4dbe15" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT 0.984`);
        await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr((uuid_generate_v4()), 1, 6)`);
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "audit_trail" DROP COLUMN "auditType"`);
        await queryRunner.query(`ALTER TABLE "audit_trail" ADD "text" character varying NOT NULL`);
    }

}
