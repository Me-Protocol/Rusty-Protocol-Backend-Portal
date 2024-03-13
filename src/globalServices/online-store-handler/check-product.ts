import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import { Brand } from '../brand/entities/brand.entity';

export const checkProductOnBrandStore = async ({
  brand,
  productId,
}: {
  brand: Brand;
  productId: string;
}) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce;

  switch (brand.online_store_type) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(brand);

      await woocommerce
        .get(`products/${productId}`)
        .then((response) => {
          console.log('response', response.data);
          return response.data;
        })
        .catch((error) => {
          throw new Error(error);
        });

      break;
    case OnlineStoreType.SHOPIFY:
      return 'product';
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
