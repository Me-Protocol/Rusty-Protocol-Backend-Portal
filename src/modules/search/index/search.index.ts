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
}
