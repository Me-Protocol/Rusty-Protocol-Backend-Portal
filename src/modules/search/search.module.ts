import {
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import {
  brandIndex,
  collectionIndex,
  offerIndex,
  productIndex,
  rewardIndex,
  searchIndex,
  userIndex,
} from './interface/search.interface';

export class SearchModule {
  constructor(private readonly esService: ElasticsearchService) {}

  public async onModuleInit() {
    [
      userIndex,
      offerIndex,
      rewardIndex,
      brandIndex,
      collectionIndex,
      productIndex,
      searchIndex,
    ].forEach(async (index) => {
      const exists = await this.esService.indices.exists({
        index: index._index,
      });

      if (!exists) {
        await this.esService.indices.create({
          index: index._index,
          body: {
            mappings: {
              properties: {
                search_text: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                    },
                  },
                },
              },
            },
          },
        });
      }
    });
  }
}
