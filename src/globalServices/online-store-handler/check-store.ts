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
        .then((response) => {
          console.log('response', response.data);
          return response.data;
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
