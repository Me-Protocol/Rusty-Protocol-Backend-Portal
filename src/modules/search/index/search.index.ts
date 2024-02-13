import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  SearchEntity,
  SearchIndex,
  SearchServiceInterface,
} from 'src/modules/search/interface/search.interface';

@Injectable()
export class ElasticIndex {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  public async insertDocument(
    entity: SearchEntity,
    index: SearchIndex,
  ): Promise<any> {
    try {
      const data = this.document(index, entity);
      return this.searchService.insertIndex(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  public async updateDocument(
    entity: SearchEntity,
    index: SearchIndex,
  ): Promise<any> {
    try {
      const data = this.document(index, entity);
      await this.deleteDocument(index, entity.id);
      return this.searchService.insertIndex(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  public async deleteDocument(index: SearchIndex, id: string): Promise<any> {
    try {
      const data = {
        index: index._index,
        type: index._type,
        id: id.toString(),
      };
      return this.searchService.deleteDocument(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  public async batchUpdateIndex(entities: SearchEntity[], index: SearchIndex) {
    try {
      const existingIds = await this.fetchExistingIdsFromIndex(index);

      console.log(existingIds);

      const newData = entities.filter(
        (entity) => !existingIds.has(entity.id.toString()),
      );

      const data = this.createBulkRequest(index, newData as SearchEntity[]);

      await this.searchService.batchInsert(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  public async batchCreateIndex(entities: SearchEntity[], index: SearchIndex) {
    try {
      const existingIds =
        await this.fetchExistingIdsFromIndexAndCreateIfNotExist(index);

      const newData = entities.filter(
        (entity) => !existingIds.has(entity.id.toString()),
      );

      const data = this.createBulkRequest(index, newData as SearchEntity[]);

      await this.searchService.batchInsert(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  private bulkIndex(index: SearchIndex, id: number): any {
    return {
      _index: index._index,
      _type: index._type,
      _id: id,
    };
  }

  private document(index: SearchIndex, entity: SearchEntity): any {
    const bulk = [];
    bulk.push({
      index: this.bulkIndex(index, Number(entity.id)),
    });
    bulk.push(entity);
    return {
      body: bulk,
      index: index._index,
      type: index._type,
    };
  }

  private createBulkRequest(index: SearchIndex, entities: SearchEntity[]): any {
    const bulk = [];

    entities.forEach((entity) => {
      bulk.push({ index: { _index: index._index, _id: entity.id } });
      bulk.push(entity);
    });

    return {
      body: bulk,
    };
  }

  private async fetchExistingIdsFromIndex(
    index: SearchIndex,
  ): Promise<Set<string>> {
    try {
      const existingIds = new Set<string>();

      // Fetch existing document IDs from the index
      const existingDocuments = await this.searchService.searchIndex({
        index: index._index,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      console.log(existingDocuments);

      existingDocuments.forEach((doc) => existingIds.add(doc._source.id));

      return existingIds;
    } catch (e) {
      Logger.error(e);
    }
  }

  private async fetchExistingIdsFromIndexAndCreateIfNotExist(
    index: SearchIndex,
  ): Promise<Set<string>> {
    try {
      const existingIds = new Set<string>();

      // Check if index exists
      const indexExists = await this.searchService.indexExists(index._index);

      // If index does not exist, create it
      if (!indexExists) {
        await this.searchService.createIndex(index, index._index);
      }

      const existingDocuments = await this.searchService.searchIndex({
        index: index._index,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      setTimeout(async () => {
        const existingDocuments = await this.searchService.searchIndex({
          index: index._index,
          body: {
            query: {
              match_all: {},
            },
          },
        });

        existingDocuments?.map(async (doc) => {
          // Assuming this.searchService.getDocumentById is an asynchronous function
          await existingIds.add(doc._source.id);
        });
      }, 6000);

      return existingIds;
    } catch (e) {
      Logger.error(e);
    }
  }
}
