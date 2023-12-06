import {
  ElasticsearchModule,
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
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ELASTIC_NODE,
  ELASTIC_USERNAME,
  ELASTIC_PASSWORD,
  ELASTIC_CA,
} from '@src/config/env.config';
import { SearchService } from './search.service';

/**
 * Elastic search configuration module for reading properties from environment variables
 * Exported as ElasticSearchConfig
 */
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTIC_NODE', ELASTIC_NODE),
        auth: {
          username: configService.get('ELASTIC_USERNAME', ELASTIC_USERNAME),
          password: configService.get('ELASTIC_PASSWORD', ELASTIC_PASSWORD),
        },
        tls: {
          ca: configService.get('ELASTIC_CA', ELASTIC_CA),
          rejectUnauthorized: false,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        requestTimeout: 30000,
        log: 'trace',
      }),
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
    try {
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
    } catch (e) {
      Logger.error(e);
    }
  }
}
