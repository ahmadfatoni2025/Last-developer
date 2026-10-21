/* ==========================================================================
   Leam — JavaScript Entry Point
   ========================================================================== */

/**
 * Initialise Lucide icon set.
 * Lucide is loaded via CDN (unpkg.com/lucide@latest) before this script.
 * All <i data-lucide="..."> elements are replaced with inline SVG.
 */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
