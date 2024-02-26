import { BaseEntity } from '@src/common/entities/base.entity';
import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Currency } from './currency.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';

@Entity('region')
export class Region extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({
    default: 'currencyFlag',
  })
  flag: string;

  @Column()
  currencyId: string;

  @ManyToOne(() => Currency, (currency) => currency.regions)
  currency: Currency;

  @ManyToMany(() => Brand, (brand) => brand.regions)
  brands: Brand[];

  @ManyToMany(() => Product, (product) => product.regions)
  products: Product[];
}
