import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export class WooCommerceHandler {
  // private url: string;
  // private version: string;

  // constructor({ url, version }: { url: string; version: string }) {
  //   this.url = url;
  //   this.version = version;
  // }

  public createInstance(
    consumerKey: string,
    consumerSecret: string,
    url: string,
  ): WooCommerceRestApi {
    const woocommerce = new WooCommerceRestApi({
      url: url,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret,
      version: 'wc/v3',
      queryStringAuth: true,
    });

    return woocommerce;
  }
}
