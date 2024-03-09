import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';

@Entity('keyIdentifier')
export class KeyIdentifier extends BaseEntity {
  @Column({
    nullable: true,
  })
  rewardId: string;

  @Column({
    nullable: true,
  })
  apiKeyId: string;

  @Column()
  identifier: string;

  @Column({
    type: 'enum',
    enum: KeyIdentifierType,
  })
  identifierType: KeyIdentifierType;
}
