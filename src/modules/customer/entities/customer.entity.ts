// customer entity

import { BaseEntity } from "@src/models/base.entity";
import { User } from "@src/modules/user/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity("customer")
export class Customer extends BaseEntity {
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  bio: string;
}
