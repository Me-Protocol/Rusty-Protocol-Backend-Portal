import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711572714617 implements MigrationInterface {
    name = 'Migrations1711572714617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "vaultAvailableSupply"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "treasuryAvailableSupply"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "vaultTotalSupply"`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalVaultSupply" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "availableVaultSupply" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "availableTreasurySupply" numeric NOT NULL DEFAULT '0'`);
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
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "availableTreasurySupply"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "availableVaultSupply"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalVaultSupply"`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "vaultTotalSupply" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "treasuryAvailableSupply" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "vaultAvailableSupply" numeric NOT NULL DEFAULT '0'`);
    }

}
