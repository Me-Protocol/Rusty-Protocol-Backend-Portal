import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711560395911 implements MigrationInterface {
  name = 'Migrations1711560395911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reward" ADD COLUMN IF NOT EXISTS "vaultTotalSupply" numeric NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ADD COLUMN IF NOT EXISTS "vaultAvailableSupply" numeric NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ADD COLUMN IF NOT EXISTS "treasuryAvailableSupply" numeric NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr(uuid_generate_v4()::text, 1, 6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT '0.984'`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT '1.2'`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT '0.09'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT 0.09`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT 1.2`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT 0.984`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr((uuid_generate_v4()), 1, 6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" DROP COLUMN "treasuryAvailableSupply"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" DROP COLUMN "vaultAvailableSupply"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" DROP COLUMN "vaultTotalSupply"`,
    );
  }
}
