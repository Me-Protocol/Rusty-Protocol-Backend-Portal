import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import { Brand } from '../brand/entities/brand.entity';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import axios, { AxiosInstance } from 'axios';
import { ShopifyHandler } from './shopify';

export const checkBrandOnlineStore = async ({ brand }: { brand: Brand }) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce: WooCommerceRestApi;

  let shopifyHandler: ShopifyHandler;
  let shopify: AxiosInstance;

  switch (brand.online_store_type) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(brand);

      return await woocommerce
        .get('')
        .then((response) => {
          console.log('response', response.data);
          return response.data;
        })
        .catch((error) => {
          throw new Error('Store not found on woocommerce');
        });

    case OnlineStoreType.SHOPIFY:
      shopifyHandler = new ShopifyHandler();
      shopify = shopifyHandler.createInstance(brand);

      return await shopify
        .get('shop.json')
        .then(async (shopResponse) => {
          return await axios
            .get(
              `${brand.shopify_online_store_url}/admin/oauth/access_scopes.json`,
              {
                headers: {
                  'X-Shopify-Access-Token': brand.shopify_consumer_secret,
                },
              },
            )
            .then((response) => {
              const scopes = response.data.access_scopes;

              // Sample data
              //             {
              //   "access_scopes": [
              //     {
              //       "handle": "write_product_listings"
              //     },
              //     {
              //       "handle": "read_shipping"
              //     }
              //   ]
              // }

              // check if write_price_rules is included in the scopes
              const hasWritePriceRules = scopes.some(
                (scope: any) => scope.handle === 'write_price_rules',
              );
              const hasReadPriceRules = scopes.some(
                (scope: any) => scope.handle === 'read_price_rules',
              );

              if (!hasWritePriceRules || !hasReadPriceRules) {
                throw new Error(
                  'write_price_rules || read_price_rules scope is not enabled on the store. Please enable it to proceed.',
                );
              } else {
                return shopResponse.data;
              }
            })
            .catch((error) => {
              console.error('Error fetching access scopes:', error);
            });
        })
        .catch((error) => {
          console.log('error', error.response.data);
          throw new Error('Store not found on shopify');
        });

    case OnlineStoreType.BIG_COMMERCE:
      // const bigCommerceHandler = new BigCommerceHandler();
      // const bigCommerce = bigCommerceHandler.createInstance(
      //   data.apiKey,
      //   data.password,
      //   data.url,
      // );
      // return await bigCommerce.post('coupons', data);
      break;
    case OnlineStoreType.MAGENTO:
      // const magentoHandler = new MagentoHandler();
      // const magento = magentoHandler.createInstance(
      //   data.consumerKey,
      //   data.consumerSecret,
      //   data.url,
      // );
      // return await magento.post('coupons', data);
      break;
    default:
      throw new Error('Invalid online store type');
  }
};
