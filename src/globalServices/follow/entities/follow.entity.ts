import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('follow')
export class Follow extends BaseEntity {
  @Column({ name: 'brandId' })
  brandId: string;

  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne(() => Brand, (brand) => brand.followers)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'userId' })
  user: User;
}
