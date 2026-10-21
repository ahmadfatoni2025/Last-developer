/* =============================================================
   leam — JavaScript entry point  |  app/js/main.js
   Initialises Lucide icon set after DOM is ready.
   Lucide is loaded via CDN (unpkg.com/lucide@latest) before
   this script, so `lucide` is available on the global scope.
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
