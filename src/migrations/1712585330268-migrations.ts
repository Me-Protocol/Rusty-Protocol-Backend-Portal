import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1712585330268 implements MigrationInterface {
  name = 'Migrations1712585330268';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD IF NOT EXISTS "order_code" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD IF NOT EXISTS "brandDiscountId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" ADD IF NOT EXISTS "brandPriceRuleId" character varying`,
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
      `ALTER TABLE "coupon" DROP COLUMN "brandPriceRuleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon" DROP COLUMN "brandDiscountId"`,
    );
    await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "order_code"`);
  }
}
