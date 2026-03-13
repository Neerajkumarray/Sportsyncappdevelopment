/**
 * PWA Configuration
 * 
 * For production PWA deployment, add the following to your index.html:
 * 
 * <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
 * <meta name="theme-color" content="#1E3A8A">
 * <meta name="apple-mobile-web-app-capable" content="yes">
 * <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
 * <link rel="manifest" href="/manifest.json">
 * 
 * Create a manifest.json file in your public directory:
 */

export const pwaManifest = {
  name: 'SportSync',
  short_name: 'SportSync',
  description: 'Discover and join sports events near you',
  start_url: '/',
  display: 'standalone',
  background_color: '#F9FAFB',
  theme_color: '#1E3A8A',
  orientation: 'portrait',
  icons: [
    {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
  screenshots: [
    {
      src: '/screenshots/mobile-1.png',
      sizes: '390x844',
      type: 'image/png',
      form_factor: 'narrow',
    },
  ],
  categories: ['sports', 'social', 'lifestyle'],
  shortcuts: [
    {
      name: 'Discover Events',
      url: '/',
      icons: [{ src: '/icons/discover.png', sizes: '96x96' }],
    },
    {
      name: 'Create Event',
      url: '/create',
      icons: [{ src: '/icons/create.png', sizes: '96x96' }],
    },
  ],
};

/**
 * Service Worker Registration (for offline support)
 * 
 * Add this to your main entry point after React renders:
 * 
 * if ('serviceWorker' in navigator) {
 *   window.addEventListener('load', () => {
 *     navigator.serviceWorker.register('/service-worker.js')
 *       .then(registration => console.log('SW registered:', registration))
 *       .catch(error => console.log('SW registration failed:', error));
 *   });
 * }
 */
