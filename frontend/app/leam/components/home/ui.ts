/**
 * Token visual bersama untuk halaman.
 * Semua permukaan mengikuti bahasa "light embossed":
 * putih lembut + rim cahaya di tepi atas + bayangan lembut ke bawah.
 * Warna teks gelap agar kontras di atas dasar putih.
 */

export const SURFACE =
  'rounded-3xl bg-gradient-to-b from-[#ffffff] to-[#f1f4f7] shadow-[0_18px_40px_-16px_rgba(15,23,42,0.18),0_4px_10px_-6px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(15,23,42,0.045)]';

export const CARD =
  'rounded-3xl bg-gradient-to-b from-[#ffffff] to-[#f6f8fa] shadow-[0_10px_28px_-14px_rgba(15,23,42,0.2),0_2px_6px_-2px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(15,23,42,0.035)]';

export const CARD_HOVER =
  'hover:from-[#ffffff] hover:to-[#eef2f6] hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.26),0_4px_10px_-4px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(15,23,42,0.06)]';

export const PILL =
  'inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#ffffff] to-[#f1f4f7] px-3.5 py-1.5 text-[13px] font-medium text-[#4b5563] shadow-[0_3px_8px_-3px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(15,23,42,0.04)]';

export const BTN_PRIMARY =
  'inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] px-5 py-2.5 text-sm font-semibold text-[#3d2c06] shadow-[0_10px_22px_-10px_rgba(245,158,11,0.65),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 ease-out hover:from-[#fcd34d] hover:to-[#fbbf24] hover:shadow-[0_14px_28px_-10px_rgba(245,158,11,0.8)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]/70 focus-visible:ring-offset-2 motion-reduce:transition-none';

export const BTN_GHOST =
  'inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#ffffff] to-[#f1f4f7] px-5 py-2.5 text-sm font-semibold text-[#0f1419] shadow-[0_8px_20px_-10px_rgba(15,23,42,0.22),0_2px_5px_-2px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(15,23,42,0.045)] transition-all duration-300 ease-out hover:from-[#ffffff] hover:to-[#e9eef3] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1419]/25 focus-visible:ring-offset-2 motion-reduce:transition-none';

export const MUTED = 'text-[15px] leading-relaxed text-[#5b6673]';

export const HEADING = 'text-3xl font-semibold tracking-tight text-[#0f1419] sm:text-4xl';

export const SECTION_WRAP = 'mx-auto w-full max-w-5xl px-5';