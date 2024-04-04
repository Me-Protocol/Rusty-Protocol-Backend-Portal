import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Brand } from '../brand/entities/brand.entity';
import { ShopifyHandler } from './shopify';
import { AxiosInstance } from 'axios';

export const deleteCouponCode = async ({
  brand,
  couponId,
  priceRuleId,
}: {
  brand: Brand;
  couponId: string;
  priceRuleId: string;
}) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce: WooCommerceRestApi;

  let shopifyHandler: ShopifyHandler;
  let shopify: AxiosInstance;

  switch (brand.online_store_type) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(brand);

      return await woocommerce
        .delete(`coupons/${couponId}`, {
          force: true,
        })
        .then(() => {
          console.log('Coupon code deleted successfully');
        })
        .catch((error) => {
          console.log(error);
          throw new Error('Failed to delete coupon code.');
        });

    case OnlineStoreType.SHOPIFY:
      shopifyHandler = new ShopifyHandler();
      shopify = shopifyHandler.createInstance(brand);

      return await shopify
        .delete(`price_rules/${priceRuleId}/discount_codes/${couponId}.json`)
        .then(() => {
          console.log('Coupon code deleted successfully');
        })
        .catch((error) => {
          console.log('error', error.response.data);
          throw new Error('Failed to delete coupon code.');
        });
    case OnlineStoreType.BIG_COMMERCE:
      // Similar pattern as above for BigCommerce
      break;
    case OnlineStoreType.MAGENTO:
      // Similar pattern as above for Magento
      break;
    default:
      throw new Error('Invalid online store type');
  }
};
