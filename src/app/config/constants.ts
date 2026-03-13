/**
 * Application Constants
 * Aligned with technical specifications
 */

export const APP_CONFIG = {
  // Geospatial Settings
  DISCOVERY_RADIUS_KM: 5, // 5km discovery radius as per spec
  DEFAULT_MAP_CENTER: [37.7749, -122.4194] as [number, number], // San Francisco
  DEFAULT_MAP_ZOOM: 13,

  // API Configuration (for production)
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
  WEBSOCKET_URL: process.env.REACT_APP_WS_URL || 'http://localhost:8080/ws',

  // Map Settings
  MAP_TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  MAP_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',

  // Theme Colors (matching Tailwind config)
  COLORS: {
    PRIMARY: '#1E3A8A', // Blue-900
    ACCENT: '#F97316', // Orange-500
    BACKGROUND: '#F9FAFB', // Gray-50
    SUCCESS: '#4ADE80', // Green-400
  },

  // JWT Token Storage Key
  AUTH_TOKEN_KEY: 'sportsync_auth_token',

  // Real-time Chat
  STOMP_TOPIC_PREFIX: '/topic/events/',
  STOMP_APP_PREFIX: '/app/chat/',
};

export const SPORT_TYPES = [
  'Soccer',
  'Basketball',
  'Tennis',
  'Volleyball',
  'Running',
  'Swimming',
  'Cycling',
  'Baseball',
  'Football',
  'Golf',
  'Other',
] as const;

export const SKILL_LEVELS = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;
