import { ELASTIC_PASSWORD, ELASTIC_USERNAME } from './env.config';

export class ConfigSearch {
  public static searchConfig(url: string): any {
    return {
      node: url,
      maxRetries: 5,
      requestTimeout: 60000,
      auth: {
        username: ELASTIC_USERNAME,
        password: ELASTIC_PASSWORD,
      },
      //sniffOnStart: true, // Don't enable sniffing when using elastic cloud https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html#authentication
    };
  }
}
