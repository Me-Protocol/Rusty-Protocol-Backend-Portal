import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import { Brand } from '../brand/entities/brand.entity';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import axios from 'axios';

export const createCoupon = async ({
  data,
  brand,
  productId,
  email,
  productIdOnBrandSite,
}: {
  data: {
    code: string;
    amount: number;
  };
  brand: Brand;
  productId: string;
  email: string;
  productIdOnBrandSite: string;
}) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce: WooCommerceRestApi;

  const body = {
    ...data,
    discount_type: 'percent',
    product_ids: [productIdOnBrandSite],
    individual_use: true,
    exclude_sale_items: false,
    usage_limit: 1,
    code: 'PERCENT_COUPON_CODE',
    amount: data.amount.toString(),
    date_expires: null,
  };

  const shopify_body = {
    shop: brand.shopify_online_store_url,
    email,
    coupon_code: data.code,
    product_id: productId,
    discount_type: 'PERCENTAGE',
    discount_value: data.amount,
    starts_at: new Date().toISOString(),
  };

  switch (brand?.online_store_type) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(brand);

      return await woocommerce
        .post('coupons', body)
        .then((response) => {
          console.log('Redeem', response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
          throw new Error(error);
        });

    case OnlineStoreType.SHOPIFY:
      return await axios
        .post(
          'https://shopify.memarketplace.io/api/coupon/create',
          shopify_body,
        )
        .then((res) => {
          if (res?.data?.error) {
            throw new Error('Product is not synchronized or not found.');
          } else {
            return res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err.message);
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
