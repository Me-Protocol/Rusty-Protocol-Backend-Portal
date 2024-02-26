import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import { Brand } from '../brand/entities/brand.entity';

export const createCoupon = async ({
  data,
  brand,
  productId,
}: {
  data: {
    code: string;
    amount: string;
    minimum_amount: string;
  };
  brand: Brand;
  productId: string;
}) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce;

  switch (brand?.onlineStoreType) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(
        brand.woocommerceConsumerKey,
        brand.woocommerceConsumerSecret,
        brand.woocommerceStoreUrl,
      );

      await woocommerce
        .post('coupons', {
          ...data,
          discount_type: 'fixed_product',
          individual_use: true,
          exclude_sale_items: true,
          // product_ids: [productId],
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(error);
        });

      break;
    case OnlineStoreType.SHOPIFY:
      // const shopifyHandler = new ShopifyHandler();
      // const shopify = shopifyHandler.createInstance(
      //   data.apiKey,
      //   data.password,
      //   data.url,
      // );
      // return await shopify.post('coupons', data);
      break;
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
