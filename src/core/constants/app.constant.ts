export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE';
export const AUTH_STRATEGY_PROVIDER = 'AUTH_STRATEGY';

export const HTTP_PROVIDER = 'HTTP_PROVIDER';
export const REDIS_PROVIDER = 'REDIS_PROVIDER';
export const FIRESTORE_PROVIDER = 'FIRESTORE_PROVIDER';

export enum DB_PROVIDER {
  USERS = 'users',
  PROVIDERS = 'providers', // Mechanical/Towing
  ORDERS = 'orders', // Truck/Tow Service => location
  CHAT = 'chat',
  INVOICES = 'invoices',
  NOTIFICATIONS = 'notifications',
  REVIEWS = 'reviews',
}
