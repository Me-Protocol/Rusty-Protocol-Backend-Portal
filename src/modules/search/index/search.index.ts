import { Inject, Injectable } from '@nestjs/common';
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
    const data = this.document(index, entity);
    return this.searchService.insertIndex(data);
  }

  public async updateDocument(
    entity: SearchEntity,
    index: SearchIndex,
  ): Promise<any> {
    const data = this.document(index, entity);
    await this.deleteDocument(index, entity.id);
    return this.searchService.insertIndex(data);
  }

  public async deleteDocument(index: SearchIndex, id: string): Promise<any> {
    const data = {
      index: index._index,
      type: index._type,
      id: id.toString(),
    };
    return this.searchService.deleteDocument(data);
  }

  public async batchUpdateIndex(entities: SearchEntity[], index: SearchIndex) {
    const existingIds = await this.fetchExistingIdsFromIndex(index);

    console.log(existingIds);

    const newData = entities.filter(
      (entity) => !existingIds.has(entity.id.toString()),
    );

    if (newData.length > 0) {
      const data = newData.map((entity) =>
        this.document(index, entity as SearchEntity),
      );
      await this.searchService.batchInsert(data);
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

  private async fetchExistingIdsFromIndex(
    index: SearchIndex,
  ): Promise<Set<string>> {
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

    existingDocuments.forEach((doc) => existingIds.add(doc._id));

    return existingIds;
  }
}
