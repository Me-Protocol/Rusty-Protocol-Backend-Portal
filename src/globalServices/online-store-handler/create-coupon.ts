import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import { Brand } from '../brand/entities/brand.entity';
import axios from 'axios';

export const createCoupon = async ({
  data,
  brand,
  productId,
  email,
}: {
  data: {
    code: string;
    amount: string;
  };
  brand: Brand;
  productId: string;
  email: string;
}) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce;

  const body = {
    ...data,
    discount_type: 'fixed_product',
    product_ids: [productId],
    individual_use: true,
    exclude_sale_items: false,
    usage_limit: 1,
  };

  switch (brand?.online_store_type) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(brand);

      await woocommerce
        .post('coupons', body)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
          throw new Error(error);
        });

      break;
    case OnlineStoreType.SHOPIFY:
      try {
        const coupon = await axios.post(
          'https://shopify.memarketplace.io/api/coupon/create',
          {
            shop: brand.online_store_url,
            email,
            product_id: productId,
            discount_type: 'FIXED_AMOUNT',
            discount_value: data.amount,
            starts_at: new Date().toISOString(),
          },
        );

        return coupon.data;
      } catch (error) {
        throw new Error(error);
      }
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
