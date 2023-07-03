// collection entity

import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/models/base.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('collection')
export class Collection extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
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
    default: ItemStatus.DRAFT,
  })
  status: ItemStatus;

  @OneToMany(() => Product, (product) => product.collection)
  products: Product[];

  @Column({
    nullable: true,
  })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.collections)
  brand: Brand;
}
