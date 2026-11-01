'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { LuArrowDown, LuArrowRight, LuArrowUpRight, LuLayers, LuX } from 'react-icons/lu';

import AnimatedContent from '../leam/components/home/ui/AnimatedContent';
import { Footer } from '../leam/components/footer/Footer';

import orderImage from '../../assets/images/portfolio/project-5.jpg';
import clinicImage from '../../assets/images/portfolio/project-4.jpg';
import hrImage from '../../assets/images/portfolio/project-3.jpg';
import stockImage from '../../assets/images/portfolio/project-1.jpg';
import posImage from '../../assets/images/portfolio/project-2.jpg';
import bookingImage from '../../assets/images/img.jpg';
import heroVideo from '../../assets/videos/demo-vid-3.mp4';

type Project = {
  id: string;
  title: string;
  category: 'E-commerce' | 'Dashboard' | 'Operasional';
  description: string;
  scope: string;
  image: string;
  year: string;
  tags: string[];
  highlights: string[];
};

const projects: Project[] = [
  {
    id: 'manajemen-order',
    title: 'Manajemen Order',
    category: 'E-commerce',
    description:
      'Satu dashboard untuk memproses order dari banyak channel, menerbitkan invoice, dan melacak pengiriman tanpa rekap manual.',
    scope: 'Order, invoice & pengiriman',
    image: orderImage,
    year: '2026',
    tags: ['Order', 'Invoice', 'Dashboard'],
    highlights: [
      'Sinkronisasi order dari toko online dan marketplace.',
      'Invoice otomatis dengan status pembayaran real-time.',
      'Laporan penjualan harian yang siap diekspor.',
    ],
  },
  {
    id: 'dashboard-klinik',
    title: 'Dashboard Klinik',
    category: 'Dashboard',
    description:
      'Rekam medis, jadwal dokter, dan antrean pasien terhubung dalam satu sistem yang mudah dipakai staf klinik.',
    scope: 'Rekam medis & antrean',
    image: clinicImage,
    year: '2026',
    tags: ['Rekam Medis', 'Jadwal', 'Antrean'],
    highlights: [
      'Rekam medis pasien yang ringkas dan aman.',
      'Jadwal dokter serta antrean yang tampil real-time.',
      'Riwayat kunjungan dan resep dalam satu layar.',
    ],
  },
  {
    id: 'sistem-hrd',
    title: 'Sistem HRD',
    category: 'Dashboard',
    description:
      'Kelola absensi, pengajuan cuti, payroll, dan penilaian karyawan dengan alur persetujuan yang jelas.',
    scope: 'Absensi, cuti & payroll',
    image: hrImage,
    year: '2025',
    tags: ['Absensi', 'Payroll', 'KPI'],
    highlights: [
      'Absensi berbasis lokasi dan shift kerja.',
      'Payroll otomatis dari data kehadiran.',
      'Penilaian kinerja dengan target per divisi.',
    ],
  },
  {
    id: 'manajemen-stok',
    title: 'Manajemen Stok',
    category: 'Dashboard',
    description:
      'Pantau stok multi-gudang, barcode, dan peringatan otomatis dalam satu tampilan yang rapi.',
    scope: 'Inventori & multi-gudang',
    image: stockImage,
    year: '2025',
    tags: ['Inventori', 'Barcode', 'Realtime'],
    highlights: [
      'Stok per gudang dengan mutasi yang tercatat.',
      'Peringatan stok minimum secara otomatis.',
      'Scan barcode untuk barang masuk dan keluar.',
    ],
  },
  {
    id: 'point-of-sale',
    title: 'Point of Sale',
    category: 'E-commerce',
    description:
      'Kasir cepat dengan dukungan shift, diskon, dan laporan penjualan yang langsung terhubung ke stok.',
    scope: 'Kasir & laporan toko',
    image: posImage,
    year: '2025',
    tags: ['Kasir', 'Shift', 'Laporan'],
    highlights: [
      'Transaksi cepat dengan dukungan barcode.',
      'Tutup kasir dan rekonsiliasi shift.',
      'Laporan penjualan per outlet dan produk.',
    ],
  },
  {
    id: 'sistem-booking',
    title: 'Sistem Booking',
    category: 'Operasional',
    description:
      'Pelanggan memesan jadwal sendiri, sementara tim Anda melihat kalender dan pengingat dalam satu tempat.',
    scope: 'Jadwal & pembayaran',
    image: bookingImage,
    year: '2025',
    tags: ['Jadwal', 'Pembayaran', 'Reminder'],
    highlights: [
      'Halaman booking mandiri untuk pelanggan.',
      'Pembayaran online dan konfirmasi otomatis.',
      'Pengingat jadwal lewat WhatsApp dan email.',
    ],
  },
  {
    id: 'crm-follow-up',
    title: 'CRM & Follow-up',
    category: 'Operasional',
    description:
      'Kelola leads, pipeline, dan follow-up tanpa catatan yang tercecer di banyak spreadsheet.',
    scope: 'Leads & pipeline sales',
    image: posImage,
    year: '2024',
    tags: ['CRM', 'Pipeline', 'WhatsApp'],
    highlights: [
      'Pipeline penjualan dengan tahapan yang jelas.',
      'Riwayat follow-up per leads tersimpan rapi.',
      'Integrasi WhatsApp untuk pesan cepat.',
    ],
  },
  {
    id: 'otomasi-operasional',
    title: 'Otomasi Operasional',
    category: 'Operasional',
    description:
      'Otomatiskan laporan harian, approval, dan integrasi antar divisi agar tim fokus ke hal yang penting.',
    scope: 'Approval & integrasi',
    image: hrImage,
    year: '2024',
    tags: ['Otomasi', 'Laporan', 'API'],
    highlights: [
      'Alur approval berjenjang tanpa kertas.',
      'Laporan otomatis terkirim sesuai jadwal.',
      'Integrasi API dengan sistem yang sudah ada.',
    ],
  },
  {
    id: 'portal-membership',
    title: 'Portal Membership',
    category: 'E-commerce',
    description:
      'Membership, voucher, dan poin loyalitas pelanggan dikelola dalam satu portal yang ringan.',
    scope: 'Membership & loyalitas',
    image: clinicImage,
    year: '2024',
    tags: ['Membership', 'Voucher', 'Poin'],
    highlights: [
      'Pendaftaran member dengan profil terpusat.',
      'Voucher dan promo dengan aturan fleksibel.',
      'Poin loyalitas yang otomatis bertambah.',
    ],
  },
];

const CATEGORY_ORDER: Project['category'][] = ['E-commerce', 'Dashboard', 'Operasional'];

const CATEGORY_STYLES: Record<Project['category'], { dot: string; gradient: string; glow: string }> = {
  'E-commerce': {
    dot: 'bg-blue-400',
    gradient: 'from-blue-400 to-indigo-400',
    glow: 'rgba(59,130,246,0.28)',
  },
  Dashboard: {
    dot: 'bg-indigo-400',
    gradient: 'from-indigo-400 to-violet-400',
    glow: 'rgba(129,140,248,0.28)',
  },
  Operasional: {
    dot: 'bg-cyan-400',
    gradient: 'from-cyan-400 to-blue-400',
    glow: 'rgba(34,211,238,0.24)',
  },
};

type CategoryFilter = 'Semua' | Project['category'];

const CATEGORY_FILTERS: CategoryFilter[] = ['Semua', ...CATEGORY_ORDER];

const fanProjects = projects.slice(0, 5);

const FAN_LAYOUT = [
  { x: '-260px', y: '30px', r: '-13deg', z: 5 },
  { x: '-130px', y: '10px', r: '-6deg', z: 6 },
  { x: '0px', y: '0px', r: '0deg', z: 7 },
  { x: '130px', y: '10px', r: '6deg', z: 6 },
  { x: '260px', y: '30px', r: '13deg', z: 5 },
] as const;

const heroImage = posImage;

type HeroMediaType = 'image' | 'video';

const HERO_MEDIA: { type: HeroMediaType; image: string; video: string } = {
  type: 'video',
  image: heroImage,
  video: heroVideo,
};

const HERO_MEDIA_CLASS =
  'project-hero-media absolute inset-0 h-full w-full object-cover object-center opacity-45 brightness-[0.5] contrast-110 saturate-[0.65] will-change-transform';

export function meta() {
  return [
    { title: 'Projects — leam' },
    {
      name: 'description',
      content: 'Kumpulan project dan studi kasus sistem digital yang kami bangun untuk bisnis Indonesia.',
    },
  ];
}

export default function Project() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Semua');
  const [fanExpanded, setFanExpanded] = useState(true);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  const visibleProjects =
    activeCategory === 'Semua' ? projects : projects.filter((project) => project.category === activeCategory);

  const selectedStyle = selected ? CATEGORY_STYLES[selected.category] : null;

  const scrollToWork = (filter?: CategoryFilter) => {
    if (filter) setActiveCategory(filter);
    window.requestAnimationFrame(() => {
      document.getElementById('work')?.scrollIntoView({
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-white selection:bg-white selection:text-black">
      <style>{`
        @keyframes projectHeroDrift {
          from { transform: scale(1.02) translate3d(0, 0, 0); }
          to { transform: scale(1.1) translate3d(-1.5%, -1.5%, 0); }
        }
        @keyframes projectFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes projectModalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .project-hero-media { animation: projectHeroDrift 22s ease-in-out infinite alternate; }
        .project-modal { animation: projectModalIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .project-fan {
          --spread: 1;
          position: relative;
          width: min(100%, 64rem);
          height: clamp(13rem, 24vw, 17rem);
          margin-inline: auto;
        }
        .project-fan[data-open='false'] { --spread: 0.38; }
        .project-fan-card {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: clamp(7rem, 14vw, 10.5rem);
          aspect-ratio: 3 / 4;
          transform: translateX(calc(-50% + (var(--x) * var(--spread)))) translateY(calc(var(--y) * var(--spread))) rotate(calc(var(--r) * var(--spread)));
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, box-shadow 300ms ease;
          will-change: transform;
        }
        .project-fan-card:hover {
          transform: translateX(calc(-50% + (var(--x) * var(--spread)))) translateY(calc(var(--y) * var(--spread) - 10px)) rotate(calc(var(--r) * var(--spread))) scale(1.025);
        }
        @media (max-width: 639px) {
          .project-fan[data-open='true'] { --spread: 0.52; }
          .project-fan[data-open='false'] { --spread: 0.26; }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-hero-media, .project-modal { animation: none !important; }
          .project-fan-card { transition: none !important; }
        }
      `}</style>

      <main>
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
          {HERO_MEDIA.type === 'video' ? (
            <video
              className={HERO_MEDIA_CLASS}
              poster={HERO_MEDIA.image}
              src={HERO_MEDIA.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : (
            <img
              src={HERO_MEDIA.image}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className={HERO_MEDIA_CLASS}
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-[#05070f]/45" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05070f] via-[#05070f]/45 to-[#05070f]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_38%,rgba(37,99,235,0.14),transparent_72%)]" />

          <AnimatedContent
            className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-6 pt-28 text-center sm:pt-12"
            trigger="mount"
            distance={28}
            duration={0.9}
            ease="power3.out"
            blur={7}
            delay={0.05}
          >
            <h1 className="mt-3 py-6 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-[clamp(4rem,13vw,9rem)] font-medium leading-[0.82] tracking-[-0.065em] text-transparent">
              Projects portofolio.
            </h1>

            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-white/45 sm:text-sm">
              Sistem digital yang kami rancang untuk membuat operasional bisnis lebih rapi, cepat, dan
              menyenangkan dipakai.
            </p>

            <button
              type="button"
              onClick={() => scrollToWork()}
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-[12px] font-medium text-white/75 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f]"
            >
              Jelajahi {String(projects.length).padStart(2, '0')} project
              <LuArrowDown
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </AnimatedContent>

        </section>

        <section id="work" className="relative scroll-mt-10 px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.045em] text-white">
                  The work index.
                </h2>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/40">
                  Dari dashboard operasional sampai toko online — setiap project dibangun untuk satu tujuan:
                  membuat kerja sehari-hari lebih ringan.
                </p>
              </div>

              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter project berdasarkan kategori">
                {CATEGORY_FILTERS.map((filter) => {
                  const isActive = activeCategory === filter;
                  const filterCount =
                    filter === 'Semua'
                      ? projects.length
                      : projects.filter((project) => project.category === filter).length;
                  const filterStyle = filter === 'Semua' ? null : CATEGORY_STYLES[filter];

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveCategory(filter)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] ${isActive
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-white/[0.025] text-white/45 hover:border-white/25 hover:text-white/80'
                        }`}
                    >
                      {filterStyle && (
                        <span className={`h-1 w-1 rounded-full ${filterStyle.dot}`} aria-hidden="true" />
                      )}
                      {filter}
                      <span className={`tabular-nums ${isActive ? 'text-black/45' : 'text-white/20'}`}>
                        {String(filterCount).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatedContent
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              distance={26}
              duration={0.75}
              ease="power3.out"
              blur={4}
              stagger={0.07}
              threshold={0.05}
            >
              {visibleProjects.map((project) => {
                const style = CATEGORY_STYLES[project.category];
                const projectNumber = String(
                  projects.findIndex((item) => item.id === project.id) + 1,
                ).padStart(2, '0');

                return (
                  <article
                    key={project.id}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[#0a0c12] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.95)]"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      aria-haspopup="dialog"
                      aria-label={`Lihat detail project ${project.title}`}
                      className="absolute inset-0 z-10 rounded-[1.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400/70"
                    />

                    <div className="relative aspect-[4/3] overflow-hidden bg-[#0d1017]">
                      <img
                        src={project.image}
                        alt={`Contoh project ${project.title}`}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full select-none object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent opacity-80" />

                      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[8px] uppercase tracking-[0.14em] text-white/65 backdrop-blur-md">
                        <span className={`h-1 w-1 rounded-full ${style.dot}`} aria-hidden="true" />
                        {project.category}
                      </span>

                      <span className="pointer-events-none absolute right-3 top-3 text-[10px] tabular-nums tracking-[0.14em] text-white/35">
                        {projectNumber}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2 py-0.5 text-[8px] uppercase tracking-[0.12em] text-white/35"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-3.5 text-[17px] font-medium leading-snug tracking-[-0.015em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-white/38">
                        {project.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
                        <span className="truncate text-[9px] uppercase tracking-[0.14em] text-white/25">
                          {project.year} · {project.scope}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/45 transition-all duration-300 group-hover:border-white/25 group-hover:text-white">
                          <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </AnimatedContent>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8">
          <AnimatedContent
            className="relative mx-auto max-w-7xl"
            distance={30}
            duration={0.85}
            ease="power3.out"
            blur={6}
            threshold={0.15}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b12] px-6 py-16 text-center sm:py-20">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_0%,rgba(59,130,246,0.12),transparent_65%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="relative">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50">
                  <LuLayers className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="mx-auto mt-5 max-w-xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
                  Punya proses yang ingin dibuat lebih rapi?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-white/40">
                  Ceritakan kebutuhan bisnis Anda. Kami bantu petakan alurnya dan rancang sistem yang sesuai.
                </p>
                <Link
                  to="/contact"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b12]"
                >
                  Mulai diskusi
                  <LuArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </section>
      </main>

      <Footer />

      {selected && selectedStyle && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/85 p-0 backdrop-blur-lg sm:items-center sm:p-6"
          role="presentation"
          onClick={() => setSelected(null)}
          style={{ animation: 'projectFadeIn 0.3s ease-out both' }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            onClick={(event) => event.stopPropagation()}
            className="project-modal relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.5rem] border border-white/10 bg-[#080a10] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] sm:rounded-[1.5rem]"
          >
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r ${selectedStyle.gradient}`}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Tutup detail project"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/80 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative aspect-[16/9] overflow-hidden sm:rounded-t-[1.5rem]">
              <img
                src={selected.image}
                alt={`Contoh project ${selected.title}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/15 to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{ background: `radial-gradient(90% 90% at 50% 100%, ${selectedStyle.glow}, transparent 70%)` }}
              />
              <span className="absolute bottom-4 left-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
                <span className={`h-1 w-1 rounded-full ${selectedStyle.dot}`} aria-hidden="true" />
                {selected.category}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-[9px] uppercase tracking-[0.24em] text-white/35">
                Case study · {selected.year}
              </p>
              <h3
                id="project-detail-title"
                className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl"
              >
                {selected.title}
              </h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/30">{selected.scope}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/50">{selected.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {selected.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-white/50">
                    <span
                      className={`mt-1.5 h-1 w-1 flex-none rounded-full ${selectedStyle.dot}`}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Diskusikan project ini
                  <LuArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[12px] font-medium text-white/55 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
