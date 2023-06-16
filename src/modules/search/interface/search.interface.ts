import { User } from "@src/modules/user/entities/user.entity";

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

export type SearchEntity = User;

export const userIndex = {
  _index: "user",
  _type: "users",
};
