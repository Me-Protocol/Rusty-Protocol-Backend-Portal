import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1712528947949 implements MigrationInterface {
  name = 'Migrations1712528947949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "auditTrail" DROP COLUMN "userEmail"`);
    // await queryRunner.query(`ALTER TABLE "auditTrail" DROP COLUMN "userName"`);
    // await queryRunner.query(
    //   `ALTER TABLE "coupon" ADD "order_code" character varying`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "coupon" ADD "brandDiscountId" character varying`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "coupon" ADD "brandPriceRuleId" character varying`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr(uuid_generate_v4()::text, 1, 6)`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT '0.984'`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT '1.2'`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT '0.09'`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "auditTrail" ALTER COLUMN "userId" SET NOT NULL`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "auditTrail" ALTER COLUMN "auditType" SET NOT NULL`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "auditTrail" ALTER COLUMN "description" SET NOT NULL`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "auditTrail" ALTER COLUMN "reportableId" SET NOT NULL`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "auditTrail" ALTER COLUMN "reportableId" DROP NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "auditTrail" ALTER COLUMN "description" DROP NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "auditTrail" ALTER COLUMN "auditType" DROP NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "auditTrail" ALTER COLUMN "userId" DROP NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "meTokenValue" SET DEFAULT 0.09`);
    // await queryRunner.query(`ALTER TABLE "admin_settings" ALTER COLUMN "topupLimitFactor" SET DEFAULT 1.2`);
    // await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" SET DEFAULT 0.984`);
    // await queryRunner.query(`ALTER TABLE "reward" ALTER COLUMN "rewardValueInDollars" TYPE numeric`);
    // await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderCode" SET DEFAULT substr((uuid_generate_v4()), 1, 6)`);
    // await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "brandPriceRuleId"`);
    // await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "brandDiscountId"`);
    // await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "order_code"`);
    // await queryRunner.query(`ALTER TABLE "auditTrail" ADD "userName" character varying`);
    // await queryRunner.query(`ALTER TABLE "auditTrail" ADD "userEmail" character varying`);
  }
}