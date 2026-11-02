import { useEffect, useRef, type CSSProperties } from 'react';
import type { Route } from './+types/contact';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Contact — leam' },
    {
      name: 'description',
      content: 'Hubungi tim leam untuk konsultasi, kolaborasi, atau pertanyaan seputar sistem digital Anda.',
    },
  ];
}

/* ──────────────────────────────────────────────────────────
 * Design tokens — konsisten dengan leam design system
 * ────────────────────────────────────────────────────────── */
const ACCENT = '#93c5fd'; // blue-300

const PHOTO: string | null = null;

const CONTACT = {
  phone: { label: '+62 812 3456 7890', href: 'tel:+6281234567890' },
  email: { label: 'halo@leam.id', href: 'mailto:halo@leam.id' },
  address: ['Banjarnegara', 'Jawa Tengah',],
};

const ROWS: { label: string; value: string; href?: string }[] = [
  { label: 'Telepon', value: CONTACT.phone.label, href: CONTACT.phone.href },
  { label: 'Alamat', value: CONTACT.address.join(', ') },
  { label: 'Email', value: CONTACT.email.label, href: CONTACT.email.href },
];

/* ── Panel kiri tekstur biru (hanya tampil di lg) ── */
function TexturePanel() {
  if (PHOTO) {
    return (
      <img
        src={PHOTO}
        alt=""
        className="h-full w-full object-cover grayscale contrast-110"
      />
    );
  }

  const mask = 'radial-gradient(ellipse 80% 46% at 44% 64%, #000 42%, transparent 100%)';
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/[0.06]"
      style={{ background: 'linear-gradient(180deg, #0a1224 0%, #05070f 100%)' }}
    >
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <defs>
          <filter id="contact-relief" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.034" numOctaves="5" seed="12" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#93c5fd" surfaceScale="6" diffuseConstant="1.1" result="lit">
              <feDistantLight azimuth="225" elevation="42" />
            </feDiffuseLighting>
            <feColorMatrix
              in="lit"
              type="matrix"
              values="0.25 0 0 0 0.05  0 0.32 0 0 0.08  0 0 0.55 0 0.12  0 0 0 1 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#contact-relief)" />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(147,197,253,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 50% 60%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 60%, black 20%, transparent 80%)',
        }}
      />
    </div>
  );
}

export default function Contact() {
  const isDesktop = useRef(false);

  /* Lock scroll HANYA di desktop (lg) — mobile tetap scrollable */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    isDesktop.current = mq.matches;

    const applyLock = (locked: boolean) => {
      const html = document.documentElement;
      const body = document.body;
      if (locked) {
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        html.style.overscrollBehavior = 'none';
      } else {
        html.style.overflow = '';
        body.style.overflow = '';
        html.style.overscrollBehavior = '';
      }
    };

    applyLock(mq.matches);

    const onChange = (e: MediaQueryListEvent) => applyLock(e.matches);
    mq.addEventListener('change', onChange);

    return () => {
      mq.removeEventListener('change', onChange);
      applyLock(false);
    };
  }, []);

  const hover =
    'transition-colors duration-300 hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline-none';

  return (
    <main
      className="relative isolate flex min-h-svh flex-col overflow-x-hidden bg-[#05070f] text-white lg:h-svh lg:overflow-hidden"
      style={{ '--accent': ACCENT } as CSSProperties}
    >
      <style>{`
        @keyframes contactRise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes contactLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes contactGlow {
          0%,100% { opacity: 0.55; }
          50%      { opacity: 0.9;  }
        }
        .contact-rise { animation: contactRise .9s cubic-bezier(.22,1,.36,1) backwards; }
        .contact-line { transform-origin: left; animation: contactLine 1s cubic-bezier(.22,1,.36,1) backwards; }
        .contact-glow { animation: contactGlow 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .contact-rise, .contact-line { animation: none; }
          .contact-glow { animation: none; }
        }
      `}</style>

      {/* ── Background dekorasi ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="contact-glow absolute left-1/2 top-0 h-64 w-72 -translate-x-1/2 rounded-full bg-blue-600/[0.13] blur-[100px] sm:h-96 sm:w-[44rem] lg:h-[30rem] lg:w-[55rem] lg:blur-[140px]" />
        <div className="absolute -left-24 -top-32 h-60 w-60 rounded-full bg-blue-600/[0.07] blur-[80px] lg:-left-40 lg:-top-52 lg:h-[34rem] lg:w-[34rem] lg:blur-[120px]" />
        <div className="absolute -right-16 bottom-0 h-40 w-60 rounded-full bg-indigo-600/[0.08] blur-3xl lg:-right-32 lg:h-64 lg:w-[28rem]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at 50% 10%, black 5%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 10%, black 5%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ── Konten utama ── */}
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:px-12 lg:pb-8 lg:pt-28">

        {/* ── HEADER: judul + panah ── */}
        <header className="flex items-start justify-between gap-4">
          <h1
            className="contact-rise font-semibold uppercase leading-[0.85] tracking-[-0.04em]
              text-4xl
              sm:text-6xl
              md:text-7xl
              lg:text-[clamp(4rem,min(14vw,22svh),11rem)]"
            style={{ animationDelay: '0.05s' }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Kontak
            </span>
          </h1>

          {/* Panah CTA */}
          <a
            href={CONTACT.email.href}
            aria-label="Kirim email"
            className="contact-rise group mt-1 shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-white transition-all duration-300
              hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-[var(--accent)] hover:shadow-[0_0_28px_-8px_rgba(96,165,250,0.55)]
              focus-visible:outline-none
              sm:p-3 sm:mt-2
              lg:p-3 lg:mt-[0.4em]"
            style={{ animationDelay: '0.2s' }}
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 transition-transform duration-500 ease-out group-hover:translate-x-[8%] group-hover:translate-y-[8%]
                sm:h-10 sm:w-10
                lg:h-[clamp(2.25rem,min(7vw,11svh),5.5rem)] lg:w-[clamp(2.25rem,min(7vw,11svh),5.5rem)]"
              aria-hidden="true"
            >
              <path d="M14 14 L80 80" />
              <path d="M82 30 V82 H30" />
            </svg>
          </a>
        </header>

        {/* ── BODY: foto + tabel kontak + sosial ── */}
        {/*
          Mobile  : stack vertikal — foto disembunyikan, tabel full-width, sosial grid 2-col
          sm      : foto kecil tampil di atas tabel (horizontal strip)
          lg      : side-by-side — foto kiri narrow, tabel+sosial kanan
        */}
        <div
          className="mt-6 flex flex-1 flex-col gap-6
            sm:mt-8
            lg:mt-10 lg:grid lg:min-h-0 lg:grid-cols-[clamp(8rem,14vw,13rem)_minmax(0,1fr)] lg:gap-x-10"
        >

          {/* ── Panel tekstur — hanya lg ── */}
          <div
            className="contact-rise hidden lg:block lg:min-h-0"
            style={{ animationDelay: '0.3s' }}
          >
            <TexturePanel />
          </div>

          {/* ── Kolom kanan / utama ── */}
          <div className="flex flex-1 flex-col justify-between gap-6 lg:min-h-0">

            {/* Tabel kontak */}
            <ul
              className="text-sm uppercase leading-snug tracking-tight
                sm:text-base
                lg:text-[clamp(0.85rem,min(1.6vw,2.6svh),1.35rem)]"
            >
              {ROWS.map((row, i) => {
                const content = (
                  <>
                    {/* Label */}
                    <span className="shrink-0 text-blue-300/60">{row.label}</span>
                    {/* Value — wraps on very small screens */}
                    <span className="text-right text-white break-words">{row.value}</span>
                  </>
                );

                const rowClass =
                  'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 sm:py-4 lg:py-[clamp(0.5rem,2svh,1rem)]';

                return (
                  <li key={row.label} className="relative">
                    {/* Garis atas biru */}
                    <span
                      aria-hidden="true"
                      className="contact-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-400/30 via-blue-400/20 to-transparent"
                      style={{ animationDelay: `${0.35 + i * 0.1}s` }}
                    />
                    {row.href ? (
                      <a href={row.href} className={`${rowClass} ${hover}`}>
                        {content}
                      </a>
                    ) : (
                      <div className={rowClass}>{content}</div>
                    )}
                    {i === ROWS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="contact-line absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blue-400/30 via-blue-400/20 to-transparent"
                        style={{ animationDelay: `${0.35 + ROWS.length * 0.1}s` }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ── Sosial + copyright ── */}
            <div
              className="contact-rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              style={{ animationDelay: '0.7s' }}
            >
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
