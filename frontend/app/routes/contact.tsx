import { useEffect, useRef } from 'react';
import type { Route } from './+types/contact';
import {
  LuPhone,
  LuMapPin,
  LuMail,
  LuArrowUpRight,
  LuInstagram,
  LuLinkedin,
  LuGithub,
  LuTwitter,
  LuYoutube,
  LuFacebook,
} from 'react-icons/lu';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Kontak — leam' },
    {
      name: 'description',
      content: 'Hubungi tim leam untuk konsultasi, kolaborasi, atau pertanyaan seputar sistem digital Anda.',
    },
  ];
}

/* ──────────────────────────────────────────────────────────────
 * Data kontak — ganti dengan data asli sebelum dipublikasikan.
 * ────────────────────────────────────────────────────────────── */
const CONTACT = {
  phone: { label: '+62 812 3456 7890', href: 'tel:+6281234567890' },
  email: { label: 'halo@leam.id', href: 'mailto:halo@leam.id' },
  address: 'Jl. Contoh No. 12, Banjarnegara, Jawa Tengah',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/', icon: LuInstagram },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: LuLinkedin },
    { label: 'GitHub', href: 'https://github.com/', icon: LuGithub },
    { label: 'X / Twitter', href: 'https://x.com/', icon: LuTwitter },
    { label: 'YouTube', href: 'https://youtube.com/', icon: LuYoutube },
    { label: 'Facebook', href: 'https://facebook.com/', icon: LuFacebook },
  ],
};

const INFO_ROWS = [
  {
    label: 'Telepon',
    value: CONTACT.phone.label,
    href: CONTACT.phone.href,
    icon: LuPhone,
  },
  {
    label: 'Email',
    value: CONTACT.email.label,
    href: CONTACT.email.href,
    icon: LuMail,
  },
  {
    label: 'Alamat',
    value: CONTACT.address,
    href: undefined as string | undefined,
    icon: LuMapPin,
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      overscroll: html.style.overscrollBehavior,
    };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      html.style.overscrollBehavior = prev.overscroll;
    };
  }, []);

  return (
    <main
      className="relative isolate flex h-[100svh] flex-col overflow-hidden bg-[#05070f] text-white"
      aria-label="Halaman Kontak"
    >
      <style>{`
        @keyframes ctRise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ctLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ctPulse {
          0%,100% { opacity: 0.55; }
          50%      { opacity: 0.9; }
        }
        .ct-rise   { animation: ctRise   .85s cubic-bezier(.22,1,.36,1) backwards; }
        .ct-fade   { animation: ctFadeIn .7s  ease                      backwards; }
        .ct-line   { transform-origin: left; animation: ctLine 1s cubic-bezier(.22,1,.36,1) backwards; }
        .ct-glow   { animation: ctPulse 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ct-rise, .ct-fade, .ct-line { animation: none; }
        }
      `}</style>

      {/* ── Ambient glows (same as team.tsx) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ct-glow absolute left-1/2 top-[10%] h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue-600/[0.12] blur-[130px]" />
        <div className="absolute -left-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-blue-600/[0.08] blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-72 w-[30rem] rounded-full bg-indigo-600/[0.08] blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 50% 18%, black 5%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 18%, black 5%, transparent 72%)',
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Vertical guide lines */}
        <div className="absolute inset-y-0 left-1/3 hidden w-px bg-white/[0.04] md:block" />
        <div className="absolute inset-y-0 left-2/3 hidden w-px bg-white/[0.04] md:block" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">

        {/* Header */}
        <header className="ct-rise mt-20 sm:mt-28" style={{ animationDelay: '0.05s' }}>
          {/* Eyebrow */}
          <div className="ct-fade mb-4 flex items-center gap-2" style={{ animationDelay: '0s' }}>
            <span className="h-px w-8 bg-gradient-to-r from-blue-400/80 to-transparent" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300/70">
              Hubungi Kami
            </span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <h1 className="text-[clamp(2.8rem,min(10vw,20svh),7rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
              Mari{' '}
              <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                terhubung
              </span>
              <br />
              bersama kami.
            </h1>

            {/* Arrow CTA */}
            <a
              href={CONTACT.email.href}
              aria-label="Kirim email"
              className="group mb-1 shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-4 text-white transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-[0_0_30px_-8px_rgba(96,165,250,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
            >
              <LuArrowUpRight
                className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <p
            className="ct-fade mt-4 max-w-lg text-sm leading-relaxed text-white/45 sm:text-base"
            style={{ animationDelay: '0.25s' }}
          >
            Tim leam siap membantu Anda membangun sistem digital yang tepat. Ceritakan kebutuhan
            Anda, dan kami akan merespons dalam 1×24 jam.
          </p>
        </header>

        {/* Divider */}
        <div
          className="ct-line my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{ animationDelay: '0.3s' }}
        />

        {/* Body — two columns */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">

          {/* Left — contact info + socials */}
          <div className="flex flex-col justify-between gap-6">

            {/* Info cards */}
            <ul className="space-y-3">
              {INFO_ROWS.map((row, i) => {
                const Icon = row.icon;
                const inner = (
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                        {row.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-white/85 sm:text-[15px]">
                        {row.value}
                      </p>
                    </div>
                    {row.href && (
                      <LuArrowUpRight
                        className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-white/20 transition-colors duration-300 group-hover:text-blue-300"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );

                const baseClass =
                  'relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:border-blue-400/25 hover:bg-blue-500/[0.06] hover:shadow-[0_8px_32px_-12px_rgba(59,130,246,0.3)]';

                return (
                  <li
                    key={row.label}
                    className="ct-rise"
                    style={{ animationDelay: `${0.35 + i * 0.08}s` }}
                  >
                    {row.href ? (
                      <a href={row.href} className={`group block ${baseClass}`}>
                        {inner}
                      </a>
                    ) : (
                      <div className={baseClass}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Socials */}
            <div
              className="ct-rise rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
              style={{ animationDelay: '0.65s' }}
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Temukan kami di
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CONTACT.socials.map(({ label, href, icon: SocialIcon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 text-[12px] font-medium text-white/55 transition-all duration-300 hover:border-blue-400/25 hover:bg-blue-500/[0.06] hover:text-white"
                  >
                    <SocialIcon className="h-3.5 w-3.5 shrink-0 text-blue-300/60 transition-colors duration-300 group-hover:text-blue-300" aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <p className="ct-fade text-[11px] text-white/25" style={{ animationDelay: '0.75s' }}>
              © {new Date().getFullYear()} leam. All rights reserved.
            </p>
          </div>

          {/* Right — contact form */}
          <div
            className="ct-rise relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-[#0b101b] to-[#070a12] p-6 shadow-[0_40px_120px_-60px_rgba(59,130,246,0.45)] sm:p-8"
            style={{ animationDelay: '0.45s' }}
          >
            {/* Inner glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-600/[0.1] blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" aria-hidden="true" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300/70">
                  Kirim Pesan
                </p>
              </div>

              <form
                ref={formRef}
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Terima kasih! Pesan Anda sudah kami terima.');
                  (e.target as HTMLFormElement).reset();
                }}
              >
                {/* Name + Company */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ct-name"
                      className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                    >
                      Nama
                    </label>
                    <input
                      id="ct-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Ahmad Fatoni"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-blue-400/40 focus:bg-blue-500/[0.05] focus:ring-1 focus:ring-blue-400/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ct-company"
                      className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                    >
                      Perusahaan
                    </label>
                    <input
                      id="ct-company"
                      name="company"
                      type="text"
                      placeholder="PT Contoh Indonesia"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-blue-400/40 focus:bg-blue-500/[0.05] focus:ring-1 focus:ring-blue-400/20"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="ct-email"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                  >
                    Email
                  </label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    required
                    placeholder="kamu@perusahaan.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-blue-400/40 focus:bg-blue-500/[0.05] focus:ring-1 focus:ring-blue-400/20"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="ct-subject"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                  >
                    Subjek
                  </label>
                  <select
                    id="ct-subject"
                    name="subject"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0b101b] px-4 py-2.5 text-sm text-white/75 outline-none transition-all duration-300 focus:border-blue-400/40 focus:ring-1 focus:ring-blue-400/20"
                  >
                    <option value="">Pilih topik…</option>
                    <option value="konsultasi">Konsultasi Sistem</option>
                    <option value="demo">Request Demo</option>
                    <option value="kolaborasi">Kolaborasi / Partnership</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="ct-message"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Ceritakan kebutuhan Anda…"
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-blue-400/40 focus:bg-blue-500/[0.05] focus:ring-1 focus:ring-blue-400/20"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 hover:shadow-[0_0_40px_-6px_rgba(59,130,246,0.9)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Kirim Pesan
                    <LuArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  {/* shine sweep */}
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-[120%]"
                    aria-hidden="true"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
