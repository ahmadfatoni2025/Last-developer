import type { CSSProperties } from 'react';
import {
  LuZap, LuShield, LuChartColumnBig, LuUsers,
  LuGlobe, LuSmartphone, LuBell, LuLock,
  LuSparkles, LuArrowRight, LuCircleCheck,
  LuCpu, LuWorkflow, LuPencilRuler, LuShieldCheck, LuGauge,
  LuFileSpreadsheet, LuFileText, LuMail, LuMessageCircle,
} from 'react-icons/lu';
import AnimatedContent from '../ui/AnimatedContent';

const stages = [
  {
    step: '01',
    label: 'Rancang',
    icon: LuPencilRuler,
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.35)',
    features: [
      {
        icon: LuZap,
        title: 'Pengembangan Cepat',
        description: 'Dari konsultasi hingga sistem berjalan dalam hitungan minggu, bukan bulan. Proses agile yang telah terbukti.',
      },
      {
        icon: LuSmartphone,
        title: 'Mobile-First & Responsif',
        description: 'Semua sistem dibangun responsif dan dioptimalkan untuk tampilan mobile, tablet, dan desktop.',
      },
    ],
  },
  {
    step: '02',
    label: 'Amankan',
    icon: LuShieldCheck,
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.35)',
    features: [
      {
        icon: LuShield,
        title: 'Keamanan Enterprise',
        description: 'SSL end-to-end, enkripsi data, backup otomatis, dan audit log untuk melindungi bisnis Anda 24/7.',
      },
      {
        icon: LuLock,
        title: 'Backup & Pemulihan',
        description: 'Data Anda aman dengan backup otomatis harian hingga real-time, dan pemulihan satu klik.',
      },
    ],
  },
  {
    step: '03',
    label: 'Hubungkan',
    icon: LuWorkflow,
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.35)',
    features: [
      {
        icon: LuGlobe,
        title: 'Integrasi Tanpa Batas',
        description: 'Hubungkan sistem Anda ke WhatsApp, payment gateway, marketplace, ERP, dan API pihak ketiga.',
      },
      {
        icon: LuBell,
        title: 'Notifikasi Otomatis',
        description: 'Notifikasi WhatsApp, email, dan in-app otomatis untuk setiap kejadian penting di sistem Anda.',
      },
    ],
  },
  {
    step: '04',
    label: 'Kendalikan',
    icon: LuGauge,
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    features: [
      {
        icon: LuChartColumnBig,
        title: 'Dashboard & Laporan',
        description: 'Pantau performa bisnis secara real-time dengan grafik interaktif dan laporan yang bisa diekspor.',
      },
      {
        icon: LuUsers,
        title: 'Manajemen Tim & Akses',
        description: 'Atur hak akses per pengguna, divisi, atau role. Sistem multi-tenant yang fleksibel dan aman.',
      },
    ],
  },
];

const messyChips = [
  { icon: LuFileSpreadsheet, label: 'Excel', className: 'left-[6%] top-[13%]', delay: '0s' },
  { icon: LuMessageCircle, label: 'WhatsApp', className: 'right-[5%] top-[20%]', delay: '-1.4s' },
  { icon: LuPencilRuler, label: 'Manual', className: 'left-[38%] top-[44%]', delay: '-2.6s' },
  { icon: LuFileText, label: 'Kertas', className: 'left-[13%] bottom-[17%]', delay: '-3.4s' },
  { icon: LuMail, label: 'Email', className: 'right-[11%] bottom-[12%]', delay: '-0.8s' },
];

const outputs = [
  { icon: LuChartColumnBig, label: 'Dashboard real-time' },
  { icon: LuWorkflow, label: 'Alur kerja otomatis' },
  { icon: LuShieldCheck, label: 'Akses terkontrol' },
];

function ZoneLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
      <span className="h-1 w-1 rounded-full bg-white/30" />
      {children}
    </span>
  );
}

function TangleField() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 160"
      fill="none"
      className="leam-tangle absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="leam-tangle-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#818cf8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#leam-tangle-line)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeDasharray="5 9"
      >
        <path d="M6 96C34 40 60 40 82 88s46 54 72 4 52-58 82-18" />
        <path d="M10 58c38 50 64-32 98 4s56 66 88 14 32-30 42 28" />
        <path d="M22 128c32-44 56 2 82-30s42-60 74-30 36 60 58-16" />
        <path d="M4 34c32 40 62 64 92 2s56 30 82 72 42-24 58 12" />
      </g>
      <g fill="#93c5fd" fillOpacity="0.5">
        <circle cx="42" cy="52" r="1.7" />
        <circle cx="96" cy="104" r="1.5" />
        <circle cx="154" cy="48" r="1.8" />
        <circle cx="198" cy="112" r="1.4" />
        <circle cx="116" cy="36" r="1.3" />
      </g>
    </svg>
  );
}

function FlowLink({ delay = 0 }: { delay?: number }) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-1 lg:py-0">
      <div className="relative h-9 w-px lg:h-px lg:w-full">
        <span className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent lg:bg-gradient-to-r" />
        <span
          className="leam-flow-y absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)] lg:hidden"
          style={{ animationDelay: `${delay}s` }}
        />
        <span
          className="leam-flow-x absolute left-0 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)] lg:block"
          style={{ animationDelay: `${delay}s` }}
        />
      </div>
    </div>
  );
}

function EngineCard() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-b from-blue-500/[0.09] via-[#081120] to-[#070b13] px-4 py-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.6) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="leam-spin absolute inset-0 rounded-full border border-dashed border-blue-400/20" />
        <div className="leam-spin-rev absolute inset-[14px] rounded-full border border-blue-400/15" />
        <div
          className="leam-spin absolute inset-[22px] rounded-full opacity-70"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(96,165,250,0.9) 60deg, transparent 130deg, transparent 260deg, rgba(129,140,248,0.7) 320deg, transparent 360deg)',
            maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
            WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
          }}
        />
        <span className="leam-orbit absolute inset-0 rounded-full">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_8px_2px_rgba(96,165,250,0.9)]" />
        </span>
        <span className="leam-orbit-rev absolute inset-2 rounded-full">
          <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-300 shadow-[0_0_6px_2px_rgba(129,140,248,0.8)]" />
        </span>
        <div className="leam-core relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/30 bg-[#0a1224] text-blue-300">
          <LuCpu className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <p className="relative mt-4 text-[13px] font-semibold tracking-tight text-white">Sistem Leam</p>
      <p className="relative mt-1 text-center text-[11px] leading-relaxed text-white/35">
        Menyatukan, mengotomasi, merapikan
      </p>
      <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-medium text-blue-200/80">
        <span className="leam-core-dot h-1 w-1 rounded-full bg-blue-300" />
        memproses
      </span>
    </div>
  );
}

function FeatureStage({ stage }: { stage: typeof stages[0] }) {
  const StageIcon = stage.icon;

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080b13] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_18px_50px_-12px_var(--glow)]"
      style={{ '--glow': stage.glow } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: stage.glow }}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative mb-4 flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] transition-transform duration-500 group-hover:scale-105"
          style={{ color: stage.accent }}
        >
          <StageIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            Tahap {stage.step}
          </p>
          <p className="text-[13px] font-semibold leading-tight text-white/85">{stage.label}</p>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-4 border-t border-white/[0.05] pt-4">
        {stage.features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/45 transition-colors duration-500 group-hover:text-white/75">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-white/90">{feature.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/55">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#05070f] px-5 py-24">
      <style>{`
        @keyframes leamSpin { to { transform: rotate(360deg); } }
        @keyframes leamSpinRev { to { transform: rotate(-360deg); } }
        @keyframes leamCore {
          0%, 100% { box-shadow: 0 0 24px -8px rgba(59,130,246,0.55), inset 0 1px 0 rgba(255,255,255,0.14); }
          50% { box-shadow: 0 0 46px -2px rgba(59,130,246,0.85), inset 0 1px 0 rgba(255,255,255,0.26); }
        }
        @keyframes leamCoreDot {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes leamOrbit { to { transform: rotate(360deg); } }
        @keyframes leamOrbitRev { to { transform: rotate(-360deg); } }
        @keyframes leamFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -5px, 0); }
        }
        @keyframes leamDash { to { stroke-dashoffset: -224; } }
        @keyframes leamFlowY {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes leamFlowX {
          0% { left: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes leamRail {
          0% { left: 0%; opacity: 0; }
          3% { opacity: 1; }
          18% { left: 0%; opacity: 1; }
          24% { left: 33.33%; opacity: 1; }
          42% { left: 33.33%; opacity: 1; }
          48% { left: 66.66%; opacity: 1; }
          66% { left: 66.66%; opacity: 1; }
          72% { left: 100%; opacity: 1; }
          96% { left: 100%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes leamNodeGlow {
          0%, 18% { opacity: 1; transform: scale(1); }
          26%, 100% { opacity: 0; transform: scale(0.7); }
        }
        @keyframes leamNodePop {
          0%, 18% { transform: scale(1.08); }
          26%, 100% { transform: scale(1); }
        }

        .leam-spin { animation: leamSpin 18s linear infinite; }
        .leam-spin-rev { animation: leamSpinRev 12s linear infinite; }
        .leam-core { animation: leamCore 3.4s ease-in-out infinite; }
        .leam-core-dot { animation: leamCoreDot 1.8s ease-in-out infinite; }
        .leam-orbit { animation: leamOrbit 7s linear infinite; }
        .leam-orbit-rev { animation: leamOrbitRev 9s linear infinite; }
        .leam-chip { animation: leamFloat 5.4s ease-in-out infinite; }
        .leam-tangle path { animation: leamDash 7s linear infinite; }
        .leam-flow-y { animation: leamFlowY 2.4s linear infinite; }
        .leam-flow-x { animation: leamFlowX 2.4s linear infinite; }
        .leam-rail-dot { animation: leamRail 9.6s linear infinite; }
        .leam-node-glow { animation: leamNodeGlow 9.6s ease-in-out infinite; }
        .leam-node-pop { animation: leamNodePop 9.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .leam-spin, .leam-spin-rev, .leam-core, .leam-core-dot, .leam-orbit,
          .leam-orbit-rev, .leam-chip, .leam-tangle path, .leam-flow-y, .leam-flow-x,
          .leam-rail-dot, .leam-node-glow, .leam-node-pop {
            animation: none !important;
          }
          .leam-rail-dot { display: none; }
          .leam-node-glow { opacity: 0.3; }
        }
      `}</style>

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
          className="mx-auto mb-12 max-w-2xl text-center"
          distance={40}
          duration={0.8}
          ease="power3.out"
          blur={6}
          stagger={0.12}
          threshold={0.1}
        >
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            Semua yang rumit,{' '}
            <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
              jadi satu sistem yang simpel.
            </span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/45 sm:text-base">
            Proses manual yang tersebar di banyak alat kami satukan menjadi satu alur kerja otomatis — rapi, terukur, dan mudah dipakai seluruh tim.
          </p>
        </AnimatedContent>

        {/* Complexity → system → clarity illustration */}
        <AnimatedContent
          className="relative"
          distance={44}
          duration={0.9}
          ease="power3.out"
          blur={8}
          scale={0.98}
          threshold={0.1}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#070a12] p-5 shadow-[0_40px_120px_-50px_rgba(37,99,235,0.65)] sm:p-7">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[80px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

            <div className="relative grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_3rem_1.15fr_3rem_1fr]">
              {/* Input: messy */}
              <div className="flex h-full flex-col rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
                <div className="flex items-center justify-between">
                  <ZoneLabel>Masukan</ZoneLabel>
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-amber-300/50">
                    rumit
                  </span>
                </div>

                <div className="relative mt-3 h-44 overflow-hidden rounded-xl border border-white/[0.05] bg-[#05070f]">
                  <TangleField />
                  {messyChips.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <span
                        key={chip.label}
                        className={`leam-chip absolute inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#0b1220]/85 px-1.5 py-1 text-[9px] font-medium text-white/55 backdrop-blur-sm ${chip.className}`}
                        style={{ animationDelay: chip.delay }}
                      >
                        <Icon className="h-2.5 w-2.5 text-white/40" aria-hidden="true" />
                        {chip.label}
                      </span>
                    );
                  })}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#05070f] via-[#05070f]/70 to-transparent" />
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-white/30">
                  5 sumber data tersebar, rekap manual, dan alur yang saling tumpang tindih.
                </p>
              </div>

              <FlowLink delay={0} />

              {/* Engine */}
              <EngineCard />

              <FlowLink delay={1.2} />

              {/* Output: tidy */}
              <div className="flex h-full flex-col rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
                <div className="flex items-center justify-between">
                  <ZoneLabel>Keluaran</ZoneLabel>
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-emerald-300/60">
                    mudah
                  </span>
                </div>

                <div className="mt-3 flex flex-1 flex-col justify-center gap-2">
                  {outputs.map((output, i) => {
                    const Icon = output.icon;
                    return (
                      <div
                        key={output.label}
                        className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-2.5 transition-colors duration-300 hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-300">
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-white/70">
                          {output.label}
                        </span>
                        <LuCircleCheck
                          className="h-3.5 w-3.5 shrink-0 text-emerald-400/70"
                          aria-hidden="true"
                          style={{ opacity: 1 - i * 0.12 }}
                        />
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-white/30">
                  Satu alur yang rapi, otomatis, dan siap dipakai tim tanpa training panjang.
                </p>
              </div>
            </div>

            {/* Summary line */}
            <div className="relative mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-white/[0.05] pt-4 text-[11px] font-medium">
              <span className="text-white/30">Rumit &amp; manual</span>
              <LuArrowRight className="h-3 w-3 text-white/20" aria-hidden="true" />
              <span className="text-blue-300/80">Disederhanakan sistem</span>
              <LuArrowRight className="h-3 w-3 text-white/20" aria-hidden="true" />
              <span className="text-emerald-300/80">Mudah dipakai</span>
            </div>
          </div>
        </AnimatedContent>

        {/* Pipeline rail */}
        <AnimatedContent
          className="relative mt-10 hidden h-14 lg:block"
          distance={20}
          duration={0.7}
          ease="power3.out"
          threshold={0.05}
        >
          <div className="absolute inset-x-[12.5%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-[12.5%] top-1/2">
            <span className="leam-rail-dot absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_16px_4px_rgba(96,165,250,0.75)]" />
          </div>

          <div className="grid h-full grid-cols-4">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div key={stage.step} className="flex items-center justify-center">
                  <div className="relative">
                    <span
                      className="leam-node-glow pointer-events-none absolute -inset-2 rounded-full blur-md"
                      style={{ background: stage.accent, animationDelay: `${i * 2.4}s` }}
                    />
                    <div
                      className="leam-node-pop relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0a0e18]"
                      style={{ animationDelay: `${i * 2.4}s` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stage.accent }} aria-hidden="true" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-white/10 bg-[#05070f] px-0.5 text-[8px] font-semibold tabular-nums text-white/40">
                        {stage.step}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}
