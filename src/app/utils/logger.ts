/**
 * Development Logger
 * Provides helpful console logs during development
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`ℹ️ [SportSync] ${message}`, ...args);
    }
  },

  success: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`✅ [SportSync] ${message}`, ...args);
    }
  },

  warning: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(`⚠️ [SportSync] ${message}`, ...args);
    }
  },

  error: (message: string, ...args: any[]) => {
    console.error(`❌ [SportSync] ${message}`, ...args);
  },

  api: (method: string, endpoint: string, data?: any) => {
    if (isDevelopment) {
      console.log(
        `🌐 [API] ${method} ${endpoint}`,
        data ? data : ''
      );
    }
  },

  websocket: (event: string, data?: any) => {
    if (isDevelopment) {
      console.log(
        `🔌 [WebSocket] ${event}`,
        data ? data : ''
      );
    }
  },

  geolocation: (lat: number, lng: number) => {
    if (isDevelopment) {
      console.log(
        `📍 [Geolocation] User position: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
      );
    }
  },
};
