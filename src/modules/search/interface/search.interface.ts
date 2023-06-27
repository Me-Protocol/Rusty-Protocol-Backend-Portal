import { Brand } from "@src/globalServices/brand/entities/brand.entity";
import { Category } from "@src/globalServices/category/entities/category.entity";
import { User } from "@src/globalServices/user/entities/user.entity";

export interface SearchServiceInterface<T> {
  insertIndex(bulkData: T): Promise<T>;

  updateIndex(updateData: T): Promise<T>;

  searchIndex(searchData: T): Promise<T>;

  deleteIndex(indexData: T): Promise<T>;

  deleteDocument(indexData: T): Promise<T>;
}

export type SearchIndex = {
  _index: string;
  _type: string;
};

export type SearchEntity = User | Category | Brand;

export const userIndex = {
  _index: "user",
  _type: "users",
};

export const categoryIndex = {
  _index: "category",
  _type: "categories",
};

export const brandIndex = {
  _index: "brand",
  _type: "brands",
};
