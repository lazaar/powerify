export const ENV = process.env.NODE_ENV || 'development';
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';
export const isTest = ENV === 'test';

export const SCOPES = 'read_orders,read_products,read_script_tags, write_script_tags,read_themes, write_themes, write_products';
export const ACTIVATE_CHARGE_ROUTE = '/activate_charge';
export const APP_NAME = 'Powerify';
export const USER_COUNTRY_TOKEN = 'c7de9d0d1498a09c96e81368b70bf9493f4abcb92ba3c642';
export const APP_URL = 'http://powerify.io';
export const APP_HOME_ROUTE = '/home';
export const AUTH_CALLBACK_ROUTE = '/auth/callback';
export const INSTALL_PAGE = `https://apps.shopify.com/${APP_NAME}`;
export const UNINSTALL_ROUTE = '/uninstall';

export const SMTP_HOST = 'smtp.gmail.com';
export const SMTP_PORT = '465';
export const SMTP_USER = 'powerifymailing@gmail.com';
export const SMTP_PWD = '123456.Aa';

export const sessionSecret =
  process.env.SESSION_SECRET || 'Your Session Secret goes here';

export const REDIS_URL = process.env.REDIS_URL || 'redis://:@127.0.0.1:6379';
