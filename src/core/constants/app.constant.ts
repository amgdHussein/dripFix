export const HTTP_PROVIDER = 'HTTP';
export const REDIS_CACHE_PROVIDER = 'REDIS_CACHE';

export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE';
export const AUTH_STRATEGY_PROVIDER = 'AUTH_STRATEGY';

export const DB_OPTIONS_PROVIDER = 'DB_OPTIONS';
export const DB_PROVIDER = 'DATABASE';

export enum DB_COLLECTION_PROVIDER {
  USERS = 'users',
  PROVIDERS = 'providers', // Mechanical/Towing
  ORDERS = 'orders', // Truck/Tow Service => location
  CHAT = 'chat',
  INVOICES = 'invoices',
  NOTIFICATIONS = 'notifications',
  REVIEWS = 'reviews',
}
