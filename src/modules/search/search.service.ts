import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigSearch } from '@src/config/search.config';
import { SearchServiceInterface } from './interface/search.interface';
import { ELASTIC_NODE } from '@src/config/env.config';

@Injectable()
export class SearchService
  extends ElasticsearchService
  implements SearchServiceInterface<any>
{
  constructor() {
    super(ConfigSearch.searchConfig(ELASTIC_NODE));
  }

  public async insertIndex(bulkData: any): Promise<any> {
    return await this.bulk(bulkData)
      .then((res: any) => res)
      .catch((err: string | Record<string, any>) => {
        return err;
      });
  }

  public async updateIndex(updateData: any): Promise<any> {
    return await this.update(updateData)
      .then((res: any) => res)
      .catch((err: string | Record<string, any>) => {
        return err;
      });
  }

  public async searchIndex(searchData: any): Promise<any> {
    return await this.search(searchData)
      .then((res: any) => {
        // console.log(res);
        return res.hits.hits;
      })
      .catch((err: string | Record<string, any>) => {
        return err;
      });
  }

  public async deleteIndex(indexData: any): Promise<any> {
    return await this.indices.delete(indexData).then((res: any) => res);
    // .catch((err: string | Record<string, any>) => {
    //   throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    // });
    // TODO: fix delete index
    //
  }

  public async deleteDocument(indexData: any): Promise<any> {
    return await this.delete(indexData)
      .then((res: any) => res)
      .catch((err: string | Record<string, any>) => {
        return err;
      });
  }

  public async createIndex(indexData: any, index): Promise<any> {
    const checkIndex = await this.indices.exists({
      index: index,
    });

    if (!checkIndex) {
      return await this.indices
        .create(indexData)
        .then((res: any) => res)
        .catch((err: string | Record<string, any>) => {
          return err;
        });
    } else {
      return true;
    }
  }
}
