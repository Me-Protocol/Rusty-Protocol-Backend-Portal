// category entity

import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { CategoryType } from '@src/utils/enums/CategoryType';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  banner: string;

  @Column()
  slug: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  type: CategoryType;

  @OneToMany(() => Category, (category) => category.parent)
  children?: Category[];

  @Column({
    nullable: true,
  })
  parentId: string;

  @OneToMany(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @OneToMany(() => Brand, (brand) => brand.category)
  brands?: Brand[];

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
