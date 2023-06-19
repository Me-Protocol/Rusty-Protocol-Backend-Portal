import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { Device } from "./device.entity";
import { BaseEntity } from "@src/models/base.entity";
import { Customer } from "@src/modules/customer/entities/customer.entity";
import { LoginType } from "@src/utils/enums/LoginType";
import { Role } from "@src/utils/enums/Role";
import { TwoFAType } from "@src/utils/enums/TwoFAType";
import { UserAppType } from "@src/utils/enums/UserAppType";

@Entity("user")
export class User extends BaseEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
    unique: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  username: string;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  last_login: Date;

  @Column({
    type: "enum",
    enum: LoginType,
    default: LoginType.DEFAULT,
  })
  loginType: LoginType;

  @Column({
    nullable: true,
  })
  accountVerificationCode: number;

  @Column({
    nullable: true,
  })
  emailVerified: boolean;

  @Column({
    nullable: true,
  })
  phoneVerified: boolean;

  @Column({
    nullable: true,
  })
  passwordResetCode: number;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    nullable: true,
    default: false,
  })
  is2faEnabled: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  banned: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  suspended: boolean;

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    nullable: true,
    type: "jsonb",
  })
  facebookAuth: object;

  @Column({
    nullable: true,
    type: "jsonb",
  })
  googleAuth: object;

  @Column({
    nullable: true,
    type: "jsonb",
  })
  twitterAuth: object;

  @Column({
    nullable: true,
    type: "enum",
    enum: TwoFAType,
  })
  twoFAType: TwoFAType;

  @Column("text", {
    nullable: true,
    array: true,
  })
  following_interests: string[];

  @Column({
    type: "enum",
    enum: UserAppType,
    default: UserAppType.USER,
    nullable: true,
  })
  userType: UserAppType;

  @Column({
    nullable: true,
  })
  countryCode: string;

  @Column({
    nullable: true,
  })
  countryAbbr: string;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;
}
