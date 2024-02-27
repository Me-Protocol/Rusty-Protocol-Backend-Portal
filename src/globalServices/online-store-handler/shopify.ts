import { Brand } from '../brand/entities/brand.entity';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

export class ShopifyHandler {
  public createInstance(brand: Brand) {
    const shopify = shopifyApi({
      apiKey: 'APIKeyFromPartnersDashboard',
      apiSecretKey: 'APISecretFromPartnersDashboard',
      scopes: ['read_products'],
      hostName: 'ngrok-tunnel-address',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: false,
    });

    return shopify;
  }
}
