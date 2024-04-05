import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const APP_SERVER_LISTEN_PORT = env.get('APP_SERVER_LISTEN_PORT').asInt();
export const APP_SERVER_LISTEN_IP = env.get('APP_SERVER_LISTEN_IP').asString();
export const API_VERSION = env.get('API_VERSION').asString();
export const GLOBAL_PREFIX = env.get('GLOBAL_PREFIX').asString();
export const CLIENT_APP_URI = env.get('CLIENT_APP_URI').asString();
export const APP_NAME = env.get('APP_NAME').asString();
export const API_ROOT = env.get('API_ROOT').asString();
export const API_DOC_ROOT = env.get('API_DOC_ROOT').asString();
export const APP_DESCRIPTION = env.get('APP_DESCRIPTION').asString();
export const SERVER_MONITOR_WEBSOCKET_URL = env
  .get('SERVER_MONITOR_WEBSOCKET_URL')
  .asString();
export const SERVER_URL = env.get('SERVER_URL').asString();

export const POSTGRES_HOST = env.get('POSTGRES_HOST').asString();
export const POSTGRES_PORT = env.get('POSTGRES_PORT').asInt();
export const POSTGRES_USER = env.get('POSTGRES_USER').asString();
export const POSTGRES_PASSWORD = env.get('POSTGRES_PASSWORD').asString();
export const POSTGRES_DATABASE = env.get('POSTGRES_DATABASE').asString();
export const PG_ADMIN_EMAIL = env.get('PG_ADMIN_EMAIL').asString();
export const PG_ADMIN_PASSWORD = env.get('PG_ADMIN_PASSWORD').asString();
export const DATABASE_URL = env.get('DATABASE_URL').asString();

export const ELASTIC_NODE = env.get('ELASTIC_NODE').asString();
export const ELASTIC_USERNAME = env.get('ELASTIC_USERNAME').asString();
export const ELASTIC_PASSWORD = env.get('ELASTIC_PASSWORD').asString();
export const ELASTIC_CA = env.get('ELASTIC_CA').asString();

export const JWT_SECRETS = env.get('JWT_SECRETS').asString();
export const JWT_TIME = env.get('JWT_TIME').asString();

export const TWILIO_SID = env.get('TWILIO_SID').asString();
export const TWILIO_TOKEN = env.get('TWILIO_TOKEN').asString();
export const TWILIO_PHONE_NUMBER = env.get('TWILIO_PHONE_NUMBER').asString();
export const TWILIO_MSG_SID = env.get('TWILIO_MSG_SID').asString();

export const SENDGRID_API_KEY = env.get('SENDGRID_API_KEY').asString();
export const SENDGRID_EMAIL = env.get('SENDGRID_EMAIL').asString();

export const SENDGRID_USER_CONTACT_LIST_ID = env
  .get('SENDGRID_USER_CONTACT_LIST_ID')
  .asString();

export const SENDGRID_BRAND_CONTACT_LIST_ID = env
  .get('SENDGRID_BRAND_CONTACT_LIST_ID')
  .asString();

export const ELASTIC_MAIL_USERNAME = env
  .get('ELASTIC_MAIL_USERNAME')
  .asString();
export const ELASTIC_MAIL_PASSWORD = env
  .get('ELASTIC_MAIL_PASSWORD')
  .asString();

export const TWITTER_CONSUMER_KEY = env.get('TWITTER_CONSUMER_KEY').asString();
export const TWITTER_CONSUMER_SECRET = env
  .get('TWITTER_CONSUMER_SECRET')
  .asString();
export const TWITTER_CALLBACK_URL = env.get('TWITTER_CALLBACK_URL').asString();
export const TWITTER_CLIENT_ID = env.get('TWITTER_CLIENT_ID').asString();
export const TWITTER_BREARER_TOKEN = env
  .get('TWITTER_BREARER_TOKEN')
  .asString();
export const TWITTER_LINK_CALLBACK_URL = env
  .get('TWITTER_LINK_CALLBACK_URL')
  .asString();

export const FACEBOOK_CLIENT_ID = env.get('FACEBOOK_CLIENT_ID').asString();
export const FACEBOOK_REDIRECT_URI = env
  .get('FACEBOOK_REDIRECT_URI')
  .asString();
export const FACEBOOK_SECRET = env.get('FACEBOOK_SECRET').asString();

export const GOOGLE_CLIENT_ID = env.get('GOOGLE_CLIENT_ID').asString();
export const GOOGLE_CLIENT_SECRET = env.get('GOOGLE_CLIENT_SECRET').asString();
export const GOOGLE_REDIRECT_URI = env.get('GOOGLE_REDIRECT_URI').asString();

export const CLOUDINARY_CLOUD_NAME = env
  .get('CLOUDINARY_CLOUD_NAME')
  .asString();
export const CLOUDINARY_API_KEY = env.get('CLOUDINARY_API_KEY').asString();
export const CLOUDINARY_API_SECRET = env
  .get('CLOUDINARY_API_SECRET')
  .asString();

export const STRIPE_SECRET_KEY = env.get('STRIPE_SECRET_KEY').asString();
export const STRIPE_PUBLISHABLE_KEY = env
  .get('STRIPE_PUBLISHABLE_KEY')
  .asString();
export const STRIPE_API_VERSION = env.get('STRIPE_API_VERSION').asString();
export const STRIPE_REFRESH_URL = env.get('STRIPE_REFRESH_URL').asString();

export const DFNS = env.get('DFNS').asString();
export const NODE_ENV = env.get('NODE_ENV').asString();
export const DFNS_ACCESS_TOKEN = env.get('DFNS_ACCESS_TOKEN').asString();
export const DFNS_PRIVATE_ACCESS_TOKEN = env
  .get('DFNS_PRIVATE_ACCESS_TOKEN')
  .asString();

export const COUPON_CODE_PREFIX = env.get('COUPON_CODE_PREFIX').asString();
export const TNX_PREFIX = env.get('TNX_PREFIX').asString();
export const MEPRO_WALLET_ADDRESS = env.get('MEPRO_WALLET_ADDRESS').asString();

export const MUMBAI_INDEXER_URL = env.get('MUMBAI_INDEXER_URL').asString();
export const MUMBAI_INDEXER_API_KEY = env
  .get('MUMBAI_INDEXER_API_KEY')
  .asString();
export const GELATO_RELAYER_STATUS_URL = env
  .get('GELATO_RELAYER_STATUS_URL')
  .asString();
export const GELATO_API_KEY = env.get('GELATO_API_KEY').asString();
export const PREMIUM = env.get('PREMIUM').asInt();
export const PRICE_ORACLE_URL = env.get('PRICE_ORACLE_URL').asString();
export const PRICE_ORACLE_API_KEY = env.get('PRICE_ORACLE_API_KEY').asString();

export const MAGIC_KEY = env.get('MAGIC_KEY').asString();
export const RPC_POLYGON_KEY = env.get('RPC_POLYGON_KEY').asString();
export const IN_APP_API_KEY = env.get('IN_APP_API_KEY').asString();
export const API_KEY_SALT = env.get('API_KEY_SALT').asString();

export const AWS_KMS_KEY_ID = env.get('AWS_KMS_KEY_ID').asString();
export const AWS_KMS_KEY_ARN = env.get('AWS_KMS_KEY_ARN').asString();
export const AWS_ACCESS_KEY_ID = env.get('AWS_ACCESS_KEY_ID').asString();
export const AWS_SECRET_ACCESS_KEY = env
  .get('AWS_SECRET_ACCESS_KEY')
  .asString();
export const AWS_REGION = env.get('AWS_REGION').asString();

export const REDIS_HOSTNAME = env.get('REDIS_HOSTNAME').asString();
export const REDIS_PASSWORD = env.get('REDIS_PASSWORD').asString();
export const REDIS_PORT = env.get('REDIS_PORT').asInt();
export const REDIS_USERNAME = env.get('REDIS_USERNAME').asString();
export const REDIS_PREFIX = env.get('REDIS_PREFIX').asString();
export const REDIS_TTL = env.get('REDIS_TTL').asString();

export const HMT_SITE_KEY = env.get('HMT_SITE_KEY').asString();
export const HMT_JOB_API_KEY = env.get('HMT_JOB_API_KEY').asString();
export const RUNTIME_URL = env.get('RUNTIME_URL').asString();

export const RUN_DEFAULT_MIGRATION = env.get('RUN_DEFAULT_MIGRATION').asBool();

export const RUN_DB_SYNC = env.get('RUN_DB_SYNC').asBool();

export const AMPLITUDE_API_KEY =
  env.get('AMPLITUDE_API_KEY').asString() ?? '6a46088de95ef5ba923f50ce771dc3ac';
