// customer entity

import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Brand } from './brand.entity';
import { BrandRole } from '@src/utils/enums/BrandRole';

@Entity('brand_member')
export class BrandMember extends BaseEntity {
  @Column()
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.members)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({
    type: 'enum',
    enum: BrandRole,
  })
  role: BrandRole;

  @Column({
    nullable: true,
  })
  userId: string;

  @OneToOne(() => User, (user) => user.brandMember)
  @JoinColumn({ name: 'userId' })
  user: User;
}
