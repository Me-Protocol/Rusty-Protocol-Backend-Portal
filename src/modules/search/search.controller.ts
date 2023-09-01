import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchObject } from './index/search.object';
import {
  brandIndex,
  offerIndex,
  productIndex,
  searchIndex,
  userIndex,
} from './interface/search.interface';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { getPlural } from '@src/utils/helpers/getPlural';
import { SearchDto } from './dto/SearchDto.dto';
import { ElasticIndex } from './index/search.index';
import * as _ from 'lodash';

@UseInterceptors(ResponseInterceptor)
@Controller('/search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly elasticIndex: ElasticIndex,
  ) {}

  //* GET: search for all
  //search?q=a
  @Get()
  async searchAll(@Query(ValidationPipe) body: SearchDto): Promise<any> {
    const { query, page, limit } = body;

    const dataObject = await Promise.all([
      SearchObject.searchObject(query, brandIndex, page, limit),
      SearchObject.searchObject(query, productIndex, page, limit),
      SearchObject.searchObject(query, offerIndex, page, limit),
      SearchObject.searchObject(query, searchIndex, page, limit),
    ]);

    await this.elasticIndex.insertDocument(
      {
        id: _.uniqueId(),
        query,
      },
      searchIndex,
    );

    return {
      result: await Promise.all(
        dataObject.map(async (data) => {
          return {
            [getPlural(data.index)]: await this.searchService.searchIndex(data),
          };
        }),
      ),

      query,
    };
  }
}
