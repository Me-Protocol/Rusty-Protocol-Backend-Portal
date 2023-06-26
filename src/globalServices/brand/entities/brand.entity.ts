import { BaseEntity } from '@src/models/base.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { RevenueRange } from '@src/utils/enums/RevenueRange';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Task } from '@src/models/tasks.entity';

@Entity('brand')
export class Brand extends BaseEntity {
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.brand)
  user: User;

  @Column({
    nullable: true,
  })
  name: string;

  @Column()
  slug: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  logo: string;

  @Column({
    nullable: true,
  })
  logo_icon: string;

  @Column({
    nullable: true,
  })
  logo_white: string;

  @Column({
    nullable: true,
  })
  logo_white_icon: string;

  @Column('text', {
    nullable: true,
    array: true,
  })
  banners: string[];

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.brands)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({
    nullable: true,
    type: 'enum',
    enum: RevenueRange,
  })
  revenueRange: RevenueRange;

  @Column({
    nullable: true,
  })
  vatTaxId: string;

  @Column({
    nullable: true,
  })
  ecommercePlatform: string;

  @Column({
    nullable: true,
  })
  loyaltyProgram: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    default: 0,
  })
  followersCount: number;

  @Column({
    default: 0,
  })
  viewsCount: number;

  @OneToMany(() => Task, (task) => task.brand)
  tasks: Task[];
}
