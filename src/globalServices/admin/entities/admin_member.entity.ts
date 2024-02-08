// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AdminRole } from '@src/utils/enums/AdminRole';

@Entity('admin_member')
export class AdminMember extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({
    type: 'array',
    array: true,
  })
  roles: AdminRole[];

  @Column({
    nullable: true,
  })
  userId: string;

  @OneToOne(() => User, (user) => user.adminMember)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    default: false,
  })
  isAccepted: boolean;

  @Column({
    nullable: true,
  })
  verifyingEmail: string;
}
