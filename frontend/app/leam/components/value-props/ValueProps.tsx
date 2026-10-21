// Stats/value props section - showing key numbers
const stats = [
  { value: '50+', label: 'Klien yang Puas', sub: 'di seluruh Indonesia' },
  { value: '98%', label: 'Kepuasan Klien', sub: 'berdasarkan survei' },
  { value: '3×', label: 'Lebih Cepat', sub: 'vs proses manual' },
  { value: '24/7', label: 'Support', sub: 'untuk enterprise' },
];

export function StatsSection() {
  return (
    <section className="border-t border-white/[0.05] bg-[#05070f] px-5 py-16" data-purpose="value-highlights">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/70">{stat.label}</div>
              <div className="mt-0.5 text-xs text-white/30">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
