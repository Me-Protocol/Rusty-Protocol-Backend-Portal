import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchObject } from "./index/search.object";
import { userIndex } from "./interface/search.interface";
import { ResponseInterceptor } from "@src/interceptors/response.interceptor";
import { getPlural } from "@src/utils/helpers/getPlural";

@UseInterceptors(ResponseInterceptor)
@Controller("/search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  //* GET: search for all
  //search?q=a
  @Get()
  async searchAll(@Query() query: any): Promise<any> {
    const { q, page, limit } = query;

    const dataObject = await Promise.all([
      SearchObject.searchObject(q, userIndex, page, limit),
    ]);

    return {
      result: await Promise.all(
        dataObject.map(async (data) => {
          return {
            [getPlural(data.index)]: await this.searchService.searchIndex(data),
          };
        })
      ),

      query: q,
    };
  }
}
