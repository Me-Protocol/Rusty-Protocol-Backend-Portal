import { Module } from '@nestjs/common';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import {
  brandIndex,
  collectionIndex,
  offerIndex,
  productIndex,
  rewardIndex,
  searchIndex,
  userIndex,
} from './interface/search.interface';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_NODE,
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
      },
      tls: {
        ca: process.env.ELASTIC_CA,
        rejectUnauthorized: false,
      },
    }),
  ],
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
  ],
  exports: [SearchModule],
})
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
