import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { Collection } from '@src/globalServices/collections/entities/collection.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { User } from '@src/globalServices/user/entities/user.entity';

export interface SearchServiceInterface<T> {
  insertIndex(bulkData: T): Promise<T>;

  updateIndex(updateData: T): Promise<T>;

  searchIndex(searchData: T): Promise<T>;

  deleteIndex(indexData: T): Promise<T>;

  deleteDocument(indexData: T): Promise<T>;

  batchInsert(indexData: T): Promise<void>;
}

export type SearchIndex = {
  _index: string;
  _type: string;
};

export type SearchEntity =
  | User
  | Category
  | Brand
  | Reward
  | Product
  | Offer
  | Collection
  | {
      id: string;
      query: string;
    };

export const userIndex = {
  _index: 'user',
  _type: '_doc',
};

export const offerIndex = {
  _index: 'offer',
  _type: '_doc',
};

export const rewardIndex = {
  _index: 'reward',
  _type: '_doc',
};

export const brandIndex = {
  _index: 'brand',
  _type: '_doc',
};

export const categoryIndex = {
  _index: 'category',
  _type: '_doc',
};

export const subCategoryIndex = {
  _index: 'sub_category',
  _type: '_doc',
};

export const collectionIndex = {
  _index: 'collection',
  _type: '_doc',
};

export const productIndex = {
  _index: 'product',
  _type: '_doc',
};

export const searchIndex = {
  _index: 'search',
  _type: '_doc',
};
