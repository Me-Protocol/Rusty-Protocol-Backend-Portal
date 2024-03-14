import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Brand } from '../brand/entities/brand.entity';

export class WooCommerceHandler {
  public createInstance(brand: Brand): WooCommerceRestApi {
    const woocommerce = new WooCommerceRestApi({
      url: brand.woocommerce_online_store_url,
      consumerKey: brand.woocommerce_consumer_key,
      consumerSecret: brand.woocommerce_consumer_secret,
      version: 'wc/v3',
      queryStringAuth: true,
    });

    return woocommerce;
  }
}
