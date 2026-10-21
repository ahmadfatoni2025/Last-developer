import type { CSSProperties } from 'react';
import {
  LuZap, LuShield, LuChartColumnBig, LuUsers,
  LuGlobe, LuSmartphone, LuBell, LuLock,
  LuSparkles, LuArrowUpRight,
} from 'react-icons/lu';
import AnimatedContent from '../ui/AnimatedContent';

const features = [
  {
    icon: LuZap,
    title: 'Pengembangan Cepat',
    description: 'Dari konsultasi hingga sistem berjalan dalam hitungan minggu, bukan bulan. Proses agile yang telah terbukti.',
    color: 'from-amber-400/20 to-orange-400/5',
    iconColor: 'text-amber-400',
    glow: 'rgba(251,191,36,0.3)',
  },
  {
    icon: LuShield,
    title: 'Keamanan Enterprise',
    description: 'SSL end-to-end, enkripsi data, backup otomatis, dan audit log untuk melindungi bisnis Anda 24/7.',
    color: 'from-emerald-400/20 to-green-400/5',
    iconColor: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.3)',
  },
  {
    icon: LuChartColumnBig,
    title: 'Dashboard & Laporan',
    description: 'Pantau performa bisnis secara real-time dengan grafik interaktif dan laporan yang bisa diekspor.',
    color: 'from-blue-400/20 to-indigo-400/5',
    iconColor: 'text-blue-400',
    glow: 'rgba(96,165,250,0.3)',
  },
  {
    icon: LuUsers,
    title: 'Manajemen Tim & Akses',
    description: 'Atur hak akses per pengguna, divisi, atau role. Sistem multi-tenant yang fleksibel dan aman.',
    color: 'from-violet-400/20 to-purple-400/5',
    iconColor: 'text-violet-400',
    glow: 'rgba(167,139,250,0.3)',
  },
  {
    icon: LuGlobe,
    title: 'Integrasi Tanpa Batas',
    description: 'Hubungkan sistem Anda ke WhatsApp, payment gateway, marketplace, ERP, dan API pihak ketiga.',
    color: 'from-cyan-400/20 to-sky-400/5',
    iconColor: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.3)',
  },
  {
    icon: LuSmartphone,
    title: 'Mobile-First & Responsif',
    description: 'Semua sistem dibangun responsif dan dioptimalkan untuk tampilan mobile, tablet, dan desktop.',
    color: 'from-pink-400/20 to-rose-400/5',
    iconColor: 'text-pink-400',
    glow: 'rgba(244,114,182,0.3)',
  },
  {
    icon: LuBell,
    title: 'Notifikasi Otomatis',
    description: 'Notifikasi WhatsApp, email, dan in-app otomatis untuk setiap kejadian penting di sistem Anda.',
    color: 'from-orange-400/20 to-red-400/5',
    iconColor: 'text-orange-400',
    glow: 'rgba(251,146,60,0.3)',
  },
  {
    icon: LuLock,
    title: 'Backup & Pemulihan',
    description: 'Data Anda aman dengan backup otomatis harian hingga real-time, dan pemulihan satu klik.',
    color: 'from-teal-400/20 to-green-400/5',
    iconColor: 'text-teal-400',
    glow: 'rgba(45,212,191,0.3)',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <div
      id={`feature-card-${index}`}
      className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080b13] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_18px_50px_-12px_var(--glow)]"
      style={{ '--glow': feature.glow } as CSSProperties}
    >
      {/* Background gradient */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Top light line */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: feature.glow }}
      />

      {/* Icon */}
      <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-all duration-500 group-hover:scale-105 group-hover:border-white/[0.16] group-hover:bg-white/[0.07]">
        <Icon className={`h-5 w-5 ${feature.iconColor} transition-transform duration-500 group-hover:scale-110`} />
      </div>

      <h3 className="relative mb-2 pr-6 text-sm font-semibold text-white">{feature.title}</h3>
      <p className="relative flex-1 text-[13px] leading-relaxed text-white/45 transition-colors duration-500 group-hover:text-white/60">
        {feature.description}
      </p>

      <LuArrowUpRight
        aria-hidden="true"
        className="absolute right-5 top-6 h-4 w-4 text-white/10 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50"
      />

      <span
        aria-hidden="true"
        className="absolute bottom-5 right-5 text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/[0.08] transition-colors duration-500 group-hover:text-white/20"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#05070f] px-5 py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-indigo-600/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-cyan-500/[0.05] blur-3xl" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at top, black 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, black 10%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <AnimatedContent
          className="mb-14 max-w-2xl"
          distance={40}
          duration={0.8}
          ease="power3.out"
          blur={6}
          stagger={0.12}
          threshold={0.1}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 backdrop-blur-sm">
            <LuSparkles className="h-3 w-3 text-blue-400" />
            Fitur Unggulan
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Semua yang Anda butuhkan,{' '}
            <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
              dalam satu platform
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/45 sm:text-base">
            Dari pengembangan hingga pemeliharaan, Leam menyediakan solusi digital lengkap yang tumbuh bersama bisnis Anda.
          </p>
        </AnimatedContent>

        {/* Grid */}
        <AnimatedContent
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          distance={48}
          duration={0.7}
          ease="power3.out"
          blur={8}
          scale={0.97}
          stagger={0.08}
          threshold={0.05}
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
