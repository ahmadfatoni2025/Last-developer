/* =============================================================
   leam — Tailwind v3 config  |  app/css/tailwind.config.js
   This mirrors the inline tailwind.config used in index.html.
   For a build-pipeline migration, move this to tailwind.config.js
   at the project root and run:
     npx tailwindcss -i ./app/css/input.css -o ./app/css/output.css
   ============================================================= */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        brandDark:    '#080808',
        surfaceCard:  '#121214',
        surfaceMuted: '#1A1A1E',
        accentGold:   '#E6A23C',
        accentAmber:  '#FF9900',
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
