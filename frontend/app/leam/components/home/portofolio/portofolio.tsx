import { useState } from 'react';
import { Link } from 'react-router';
import { LuArrowLeft, LuArrowRight, LuCheck, LuPlus } from 'react-icons/lu';
import project1 from '../../../../../assets/images/portfolio/project-1.jpg';
import project2 from '../../../../../assets/images/portfolio/project-2.jpg';
import project3 from '../../../../../assets/images/portfolio/project-3.jpg';

type Project = {
  id: string;
  title: string;
  category: string;
  tab: string;
  description: string;
  image: string;
  badge: string;
  metric: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 'stok',
    title: 'Sistem Manajemen Stok',
    category: 'Retail',
    tab: 'Retail',
    description:
      'Pantau stok multi-gudang, barcode, dan peringatan otomatis dalam satu dashboard yang rapi.',
    image: project1,
    badge: 'Stok akurat 99%',
    metric: '300+ SKU',
    tags: ['Inventori', 'Barcode', 'Realtime'],
  },
  {
    id: 'crm',
    title: 'CRM & Follow-up',
    category: 'Sales',
    tab: 'Sales',
    description:
      'Kelola leads, pipeline, dan follow-up WhatsApp tanpa catatan manual yang tercecer.',
    image: project2,
    badge: 'Follow-up 3x lebih cepat',
    metric: '1.200 leads',
    tags: ['CRM', 'Pipeline', 'WhatsApp'],
  },
  {
    id: 'otomasi',
    title: 'Otomasi Operasional',
    category: 'Otomasi',
    tab: 'Otomasi',
    description:
      'Otomatiskan laporan harian, approval, dan integrasi antar divisi agar tim fokus ke hal penting.',
    image: project3,
    badge: 'Hemat 20 jam/minggu',
    metric: '12 alur',
    tags: ['Otomasi', 'Laporan', 'API'],
  },
];

const tabs = ['Retail', 'Sales', 'Otomasi'];

export default function Portofolio() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  const go = (direction: number) => {
    setActive((current) => (current + direction + projects.length) % projects.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#05070f] px-5 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-[30rem] rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0b101b] to-[#070a12] p-4 shadow-[0_40px_120px_-60px_rgba(59,130,246,0.6)] sm:p-6 lg:p-8">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm">
              <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.9)]">
                Portofolio
              </span>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(projects.findIndex((item) => item.tab === tab))}
                  className="rounded-full px-3 py-1.5 text-xs text-white/45 transition-colors hover:text-white"
                >
                  {tab}
                </button>
              ))}
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-blue-400/30 hover:text-white"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-600 transition-transform duration-300 group-hover:rotate-90">
                <LuPlus className="h-3.5 w-3.5 text-white" />
              </span>
              Konsultasi
            </Link>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            {/* Left copy */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-tight text-white">
                  Transformasi digital
                  <br />
                  <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    untuk bisnis riil
                  </span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                  Contoh sistem nyata yang sudah dipakai klien — dari manajemen stok, CRM, hingga
                  otomasi operasional.
                </p>

                {/* Dotted divider */}
                <div className="mt-7 flex items-center gap-3">
                  <div className="h-px flex-1 border-t border-dashed border-white/15" />
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[10px] font-semibold text-white/60">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 border-t border-dashed border-white/15" />
                </div>
              </div>

              {/* Thumbnails + pager */}
              <div className="mt-8">
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {projects.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={index === active}
                      className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-300 ${
                        index === active
                          ? 'border-blue-400/60 ring-1 ring-blue-400/30'
                          : 'border-white/10 opacity-55 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-20"
                        loading="lazy"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <span className="absolute inset-x-0 bottom-1.5 text-center text-[9px] font-medium uppercase tracking-[0.12em] text-white/80">
                        {item.tab}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white/70">
                    {String(active + 1).padStart(2, '0')}
                    <span className="text-white/30">/{String(projects.length).padStart(2, '0')}</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Proyek sebelumnya"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:scale-105 hover:border-blue-400/30 hover:text-white active:scale-95"
                    >
                      <LuArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Proyek berikutnya"
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:scale-105 hover:border-blue-400/30 hover:text-white active:scale-95"
                    >
                      <LuArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#05070f] sm:min-h-[440px] lg:min-h-[500px]">
              {projects.map((item, index) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ${
                    index === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  } saturate-[0.85] group-hover:saturate-100`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />

              {/* Vertical label */}
              <span className="absolute left-3 top-6 z-10 [writing-mode:vertical-rl] rotate-180 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Portofolio
              </span>

              {/* Floating pills */}
              <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                {project.metric}
              </span>

              <span className="absolute left-10 top-24 z-10 inline-flex max-w-[70%] items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-md">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-blue-500/20 text-blue-300">
                  <LuCheck className="h-2.5 w-2.5" />
                </span>
                {project.badge}
              </span>

              {/* Bottom info */}
              <div className="absolute inset-x-4 bottom-4 z-10">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  {project.category} · Sistem
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">{project.title}</h3>
                <p className="mt-1 max-w-md text-[11px] leading-relaxed text-white/55 sm:text-xs">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-white/60 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/project"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-blue-300"
                  >
                    Detail
                    <LuArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
