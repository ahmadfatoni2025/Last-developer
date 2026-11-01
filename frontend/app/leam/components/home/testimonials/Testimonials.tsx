import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

type Testimonial = {
  company: string;
  category: string;
  name: string;
  role: string;
  highlight: string;
  detail: string;
  rating: number;
  avatar: string;
  accent: string;
};

const testimonials: Testimonial[] = [
  {
    company: 'Toko Baju Nusantara',
    category: 'Fashion & Retail',
    name: 'Siti Rahayu',
    role: 'Direktur Operasional',
    highlight: 'Omzet kami naik 40% karena tidak ada lagi order yang terlewat.',
    detail:
      'Kami sudah 3 tahun pakai spreadsheet yang berantakan. Leam membangunkan sistem manajemen order dalam 3 minggu, dan sekarang seluruh tim bisa bekerja dari mana saja.',
    rating: 5,
    avatar: 'SR',
    accent: '#a78bfa',
  },
  {
    company: 'Klinik Sehat Plus',
    category: 'Layanan Kesehatan',
    name: 'dr. Ahmad Fauzi',
    role: 'Pemilik & Dokter',
    highlight: 'Antrian pasien berkurang 60%.',
    detail:
      'Sebagai klinik yang tidak punya tim IT, kami butuh sistem yang mudah. Leam membangun sistem pendaftaran dan rekam medis yang bisa diakses dokter dan perawat dari HP.',
    rating: 5,
    avatar: 'AF',
    accent: '#34d399',
  },
  {
    company: 'CV Sinar Abadi',
    category: 'Distributor',
    name: 'Budi Santoso',
    role: 'CEO',
    highlight: 'ROI dari sistem Leam sudah terasa di bulan pertama.',
    detail:
      'Monitoring stok gudang yang dulu manual dan error-prone sekarang real-time. Tim saya tidak perlu lagi WhatsApp-an untuk cek ketersediaan barang.',
    rating: 5,
    avatar: 'BS',
    accent: '#60a5fa',
  },
  {
    company: 'PT Maju Jaya Manufaktur',
    category: 'Manufaktur',
    name: 'Rina Wulandari',
    role: 'HR Manager',
    highlight: 'Rekap absensi dan gaji yang dulu makan tiga hari, sekarang selesai dalam sejam.',
    detail:
      'Data karyawan kami tersebar di banyak file Excel. Leam menyatukannya dalam satu sistem HRD yang rapi, lengkap dengan pengajuan cuti yang bisa disetujui langsung dari HP.',
    rating: 5,
    avatar: 'RW',
    accent: '#f59e0b',
  },
  {
    company: 'Kedai Kopi Senja',
    category: 'Food & Beverage',
    name: 'Dimas Pratama',
    role: 'Pemilik',
    highlight: 'Laporan penjualan harian kini siap otomatis di akhir shift.',
    detail:
      'Dulu kasir mencatat manual dan saya baru tahu angka penjualan keesokan harinya. Sekarang sistem kasir dari Leam menampilkan omzet, menu terlaris, dan stok bahan secara langsung di tiga cabang kami.',
    rating: 5,
    avatar: 'DP',
    accent: '#e879f9',
  },
];

function QuoteMark({ color }: { color: string }) {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" style={{ color }} aria-hidden="true">
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${i < rating ? 'text-amber-400' : 'text-white/15'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      data-card
      className="group relative flex min-h-[500px] w-[84vw] max-w-[400px] shrink-0 snap-center select-none flex-col overflow-hidden rounded-[32px] border border-white/[0.07] bg-[#0b0f19] p-5 transition-colors duration-500 hover:border-white/[0.16] sm:w-[400px]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 70% at 0% 0%, ${t.accent}1f, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm font-semibold tracking-wide text-white/85"
          style={{
            background: `linear-gradient(135deg, ${t.accent}55, ${t.accent}14)`,
          }}
          aria-hidden="true"
        >
          {t.avatar}
        </div>

        <div className="flex h-14 min-w-0 items-center gap-2.5 rounded-full border border-white/[0.12] px-4">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold text-[#05070f]"
            style={{ background: t.accent }}
            aria-hidden="true"
          >
            {t.company.charAt(0)}
          </span>
          <span className="truncate text-[13px] font-medium text-white/80">{t.company}</span>
        </div>
      </div>

      <blockquote className="relative mt-12">
        <QuoteMark color={t.accent} />
        <p className="mt-5 text-balance text-[27px] leading-[1.15] tracking-[-0.025em] text-white">
          {t.highlight}
        </p>
        <p className="mt-5 text-[13px] leading-relaxed text-white/45">{t.detail}</p>
      </blockquote>

      <footer className="relative mt-auto flex items-end justify-between gap-4 pt-10">
        <div className="border-l border-white/20 pl-4">
          <p className="text-[15px] text-white">{t.name}</p>
          <p className="mt-2 text-xs text-white/45">{t.role}</p>
          <p className="mt-0.5 text-xs text-white/35">{t.category}</p>
        </div>
        <Stars rating={t.rating} />
      </footer>
    </article>
  );
}

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const [dragging, setDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [overflowing, setOverflowing] = useState(true);
  const [centeredIndex, setCenteredIndex] = useState(0);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflowing(max > 8);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  const getCenteredIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'));
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }, []);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    const card = cards[index];
    if (!card) return;

    // Kalkulasi posisi presisi: titik tengah kartu == titik tengah container
    const target = card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    el.scrollTo({ left: target, behavior: smooth && !reduce ? 'smooth' : 'auto' });
  }, []);

  // Center kartu pertama setelah render selesai
  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => scrollToIndex(0, false));
    return () => cancelAnimationFrame(raf);
  }, [scrollToIndex]);

  useEffect(() => {
    sync();
    const el = scrollerRef.current;
    if (!el) return undefined;

    const observer = new ResizeObserver(() => {
      sync();
      // Saat resize, pastikan kartu yang aktif tetap di tengah
      scrollToIndex(getCenteredIndex(), false);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync, scrollToIndex, getCenteredIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = getCenteredIndex();
        setCenteredIndex((prev) => (prev === idx ? prev : idx));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [getCenteredIndex]);

  const scrollByCard = (direction: 1 | -1) => {
    const next = Math.max(0, Math.min(testimonials.length - 1, centeredIndex + direction));
    scrollToIndex(next);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, startX: event.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture?.(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
    const el = scrollerRef.current;
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);

    requestAnimationFrame(() => scrollToIndex(getCenteredIndex()));
  };

  const arrowClass =
    'flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#05070f] transition-all duration-300 hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b13] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 disabled:hover:bg-white/10';

  return (
    <section className="relative overflow-hidden bg-[#080b13] py-24">
      {/* Header di-set max-w-7xl agar sejajar dengan batas kontainer di bawahnya */}
      <div className="mx-auto mb-12 flex max-w-7xl items-end justify-between gap-6 px-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
            Ulasan klien
          </p>
          <h2 className="mt-5 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            Dipercaya tim di seluruh <span className="text-white/35">Indonesia</span>
          </h2>
        </div>

        {overflowing && (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Testimoni sebelumnya"
              className={arrowClass}
            >
              <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Testimoni berikutnya"
              className={arrowClass}
            >
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* 
        Kontainer utama dibatasi max-w-7xl.
        mx-auto memastikan selalu di tengah.
      */}
      <div className="relative mx-auto w-full max-w-7xl">
        {/* Gradient Kiri */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#080b13] via-[#080b13]/80 to-transparent sm:w-20"
          aria-hidden="true"
        />
        {/* Gradient Kanan */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#080b13] via-[#080b13]/80 to-transparent sm:w-20"
          aria-hidden="true"
        />

        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimoni klien"
          tabIndex={0}
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              scrollByCard(1);
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              scrollByCard(-1);
            }
          }}
          className={`flex gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 ${dragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
            }`}
          style={{
            // Kalkulasi padding berdasarkan 100% dari max-w-7xl (bukan layar penuh)
            paddingInline: 'max(20px, calc((100% - min(84vw, 400px)) / 2))',
            scrollPaddingInline: 'max(20px, calc((100% - min(84vw, 400px)) / 2))',
          }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.company} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}