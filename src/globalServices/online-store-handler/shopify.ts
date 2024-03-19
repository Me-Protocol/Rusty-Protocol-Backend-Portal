import axios, { AxiosInstance } from 'axios';
import { Brand } from '../brand/entities/brand.entity';

export class ShopifyHandler {
  public createInstance(brand: Brand): AxiosInstance {
    const shopify = axios.create({
      baseURL: `${brand.shopify_online_store_url}/admin/api/2024-01/`,
      headers: {
        'X-Shopify-Access-Token': brand.shopify_consumer_secret,
      },
    });

    return shopify;
  }
}
