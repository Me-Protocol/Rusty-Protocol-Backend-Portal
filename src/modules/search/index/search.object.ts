import { SearchIndex } from '../interface/search.interface';

export class ElasticSearchBody {
  size: number;
  from: number;
  query: any;

  constructor(size: number, from: number, query: any) {
    this.size = size;
    this.from = from;
    this.query = query;
  }
}

export class SearchObject {
  public static searchObject(q: any, index: SearchIndex, page = 1, limit = 10) {
    const body = this.elasticSearchBody(q, page, limit);
    return { index: index._index, body };
  }

  public static elasticSearchBody(
    q: any,
    page: number,
    limit: number,
  ): ElasticSearchBody {
    const query = {
      multi_match: {
        query: q,
        fields: ['name^2', 'description', 'username', 'content'],
        fuzziness: 'AUTO',
        prefix_length: 2,
      },
    };

    // get size and from from page and limit

    const size = limit;
    const from = (page - 1) * limit;

    return new ElasticSearchBody(size, from, query);
  }
}
