import { LuCalendarDays, LuChartColumnBig, LuHeartPulse, LuPackage, LuStore, LuUsers } from 'react-icons/lu';

const templates = [
  {
    id: 'startup-kit',
    title: 'Manajemen Order',
    category: 'E-commerce',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
    accent: '#818cf8',
    icon: LuPackage,
  },
  {
    id: 'ecommerce',
    title: 'Dashboard Klinik',
    category: 'Kesehatan',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)',
    accent: '#34d399',
    icon: LuHeartPulse,
  },
  {
    id: 'saas-dashboard',
    title: 'Sistem HRD',
    category: 'Human Resources',
    gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 40%, #44403c 70%, #1c1917 100%)',
    accent: '#f59e0b',
    icon: LuUsers,
  },
  {
    id: 'inventory',
    title: 'Manajemen Stok',
    category: 'Retail & Gudang',
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #1d4ed8 100%)',
    accent: '#60a5fa',
    icon: LuChartColumnBig,
  },
  {
    id: 'pos',
    title: 'Point of Sale',
    category: 'Kasir & Toko',
    gradient: 'linear-gradient(135deg, #4a044e 0%, #701a75 50%, #86198f 100%)',
    accent: '#e879f9',
    icon: LuStore,
  },
  {
    id: 'booking',
    title: 'Sistem Booking',
    category: 'Jasa & Layanan',
    gradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #9a3412 100%)',
    accent: '#fb923c',
    icon: LuCalendarDays,
  },
];

function TemplateCard({ template }: { template: typeof templates[0] }) {
  const Icon = template.icon;

  return (
    <div
      id={`template-${template.id}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
      style={{ background: template.gradient }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
        <Icon className="mb-1 h-8 w-8" style={{ color: template.accent }} />
        <h3
          className="text-lg font-semibold text-white drop-shadow-lg"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
        >
          {template.title}
        </h3>
        <span
          className="mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2"
          style={{ background: `${template.accent}22`, color: template.accent, border: `1px solid ${template.accent}44` }}
        >
          {template.category}
        </span>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 translate-x-[-100%] skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />

      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-30 blur-2xl"
        style={{ background: template.accent }}
      />
    </div>
  );
}

export function TemplateGallery() {
  return (
    <section id="templates" className="relative overflow-hidden bg-[#05070f] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm text-white/40">Pre-built designs, siap dikustomisasi</p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mulai lebih cepat dengan template kami
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-white md:flex"
          >
            Lihat semua
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <p className="mb-12 max-w-xl text-sm text-white/40">
          Lewati kanvas kosong. Mulai dengan preset yang dikurasi untuk industri dan kebutuhan spesifik.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}
