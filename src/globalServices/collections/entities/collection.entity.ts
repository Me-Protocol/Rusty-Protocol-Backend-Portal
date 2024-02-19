// collection entity

import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Like } from '@src/globalServices/like/entities/like.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('collection')
export class Collection extends BaseEntity {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.PUBLISHED,
  })
  status: ItemStatus;

  @ManyToMany(() => Product, (product) => product.collections)
  products: Product[];

  @Column({
    nullable: true,
  })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.collections)
  brand: Brand;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Column({
    default: false,
  })
  isDefault: boolean;

  @Column({
    default: true,
  })
  isPublic: boolean;
}
