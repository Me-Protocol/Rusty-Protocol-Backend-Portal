// api_key entity

import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('api_key')
export class ApiKey extends BaseEntity {
  @Column()
  publicKey: string;

  @Column()
  privateKey: string;

  @Column()
  brandId: string;

  @Column({
    nullable: true,
  })
  userId: string;

  @ManyToOne(() => Brand, (brand) => brand.apiKeys)
  brand: Brand;
}
