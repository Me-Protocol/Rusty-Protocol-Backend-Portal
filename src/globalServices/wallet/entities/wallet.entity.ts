// wallet entity

import { User } from "@src/globalServices/user/entities/user.entity";
import { BaseEntity } from "@src/models/base.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallet")
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  walletId: string;

  @OneToOne(() => User, (user) => user.wallet)
  user: User;
}
