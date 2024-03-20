import { BaseEntity } from '@src/common/entities/base.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { CampaignType } from '@src/utils/enums/CampaignType';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('campaign')
export class Campaign extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  end_date: Date;

  @Column({
    default: false,
  })
  ended: boolean;

  @Column({
    type: 'enum',
    enum: CampaignType,
  })
  type: CampaignType;

  @Column({
    default: false,
  })
  active: boolean;

  @Column()
  totalUsers: number;

  @Column()
  rewardPerUser: number;

  @Column()
  availableRewards: number;

  @Column()
  brandId: string;

  @Column()
  rewardId: string;

  @Column()
  availableUsers: number;

  @ManyToOne(() => Brand, (brand) => brand.id)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;
}
