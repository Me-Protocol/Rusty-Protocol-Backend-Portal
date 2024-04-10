import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { WooCommerceHandler } from './woocommerce';
import { Brand } from '../brand/entities/brand.entity';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { AxiosInstance } from 'axios';
import { ShopifyHandler } from './shopify';
import { APP_NAME } from '@src/config/env.config';

export const createCoupon = async ({
  data,
  brand,
  productIdOnBrandSite,
  quantity,
}: {
  data: {
    code: string;
    amount: number;
  };
  brand: Brand;
  productId: string;
  email: string;
  productIdOnBrandSite: string;
  quantity: number;
}) => {
  let woocommerceHandler: WooCommerceHandler;
  let woocommerce: WooCommerceRestApi;

  let shopifyHandler: ShopifyHandler;
  let shopify: AxiosInstance;

  const body = {
    ...data,
    discount_type: 'percent',
    product_ids: [productIdOnBrandSite],
    individual_use: true,
    exclude_sale_items: false,
    usage_limit: 1,
    limit_usage_to_x_items: quantity,
    usage_limit_per_user: 1,
    amount: data.amount.toString(),
    date_expires: null,
  };

  const shopify_body_price_rule = {
    title: `${APP_NAME} Discount - ${data?.code}`, // Your discount title
    target_type: 'line_item',
    target_selection: 'entitled',
    allocation_method: 'across',
    value_type: 'fixed_amount',
    // prerequisite_subtotal_range: {
    //   greater_than_or_equal_to: body.amount,
    // },
    starts_at: new Date().toISOString(),
    entitled_product_ids: [productIdOnBrandSite.toString()],
    allocation_limit: 1,
    customer_selection: 'all',
    once_per_customer: true,
    usage_limit: 1,
  };

  console.log('shopify_body_price_rule', shopify_body_price_rule);

  // const shopify_body = {
  //   access_token: brand.shopify_consumer_secret,
  //   shop: brand.shopify_online_store_url,
  //   email,
  //   coupon_code: data.code,
  //   product_id: productIdOnBrandSite,
  //   discount_type: 'PERCENTAGE',
  //   discount_value: data.amount,
  //   starts_at: new Date().toISOString(),
  // };

  switch (brand?.online_store_type) {
    case OnlineStoreType.WOOCOMMERCE:
      woocommerceHandler = new WooCommerceHandler();
      woocommerce = woocommerceHandler.createInstance(brand);
      console.log(brand.online_store_type);

      return await woocommerce
        .post('coupons', body)
        .then((response) => {
          console.log('Redeem', response.data);
          return {
            price_rule_id: null,
            discount_code_id: response.data.id,
          };
        })
        .catch((error) => {
          console.log(error.response.data);
          throw new Error(error);
        });

    case OnlineStoreType.SHOPIFY:
      shopifyHandler = new ShopifyHandler();
      shopify = shopifyHandler.createInstance(brand);

      return await shopify
        .get(`products/${productIdOnBrandSite}.json?fields=id,variants`)
        .then(async (productResponse) => {
          const variant = productResponse?.data?.product?.variants?.[0];
          const discount = variant?.price * quantity * (data.amount / 100);

          return await shopify
            .post('price_rules.json', {
              price_rule: {
                ...shopify_body_price_rule,
                value: `-${discount}`,
              },
            })
            .then(async (response) => {
              const price_rule_id = response?.data?.price_rule?.id;
              console.log('response', response.data);

              if (!price_rule_id) throw new Error('Price rule id not found');

              console.log('price_rule_id', price_rule_id);

              return await shopify
                .post(`price_rules/${price_rule_id}/discount_codes.json`, {
                  discount_code: {
                    code: body.code,
                  },
                })
                .then((discountResponse) => {
                  const discount_code_id =
                    discountResponse?.data?.discount_code?.id;

                  return {
                    price_rule_id,
                    discount_code_id,
                  };
                })
                .catch((error) => {
                  console.log(error.response);
                  throw new Error(error);
                });
            })
            .catch((error) => {
              console.log(error.response);
              throw new Error(error);
            });
        })
        .catch((error) => {
          console.log(error.response);
          throw new Error(error);
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
