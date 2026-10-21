/* ==========================================================================
   Leam — Tailwind CSS Config (loaded inline via CDN)
   Extracted here for reference / future migration to build step
   ========================================================================== */

/**
 * To use a proper build pipeline instead of CDN, install:
 *   npm install -D tailwindcss
 *   npx tailwindcss init
 *
 * Then move this config into tailwind.config.js and run:
 *   npx tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch
 */

window.tailwindConfig = {
  theme: {
    extend: {
      colors: {
        brandDark:   '#080808',
        surfaceCard: '#121214',
        surfaceMuted:'#1A1A1E',
        accentGold:  '#E6A23C',
        accentAmber: '#FF9900',
      },
      fontFamily: {
        sans: [
          'Inter', 'system-ui', '-apple-system',
          'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif',
        ],
      },
    },
  },
};
