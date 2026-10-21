// Performance comparison charts - like Kraft's "Performance that stands out" section
const metrics = [
  {
    label: 'Kecepatan',
    items: [
      { name: 'Leam', value: 94.2, highlight: true },
      { name: 'Freelancer Biasa', value: 71.8, highlight: false },
      { name: 'Agency Besar', value: 68.4, highlight: false },
      { name: 'In-house Dev', value: 58.7, highlight: false },
    ],
  },
  {
    label: 'Kualitas',
    items: [
      { name: 'Leam', value: 96.8, highlight: true },
      { name: 'Freelancer Biasa', value: 89.2, highlight: false },
      { name: 'Agency Besar', value: 82.1, highlight: false },
      { name: 'In-house Dev', value: 79.4, highlight: false },
    ],
  },
  {
    label: 'Konsistensi',
    items: [
      { name: 'Leam', value: 98.1, highlight: true },
      { name: 'Freelancer Biasa', value: 81.3, highlight: false },
      { name: 'Agency Besar', value: 76.9, highlight: false },
      { name: 'In-house Dev', value: 72.4, highlight: false },
    ],
  },
];

function MetricGroup({ metric }: { metric: typeof metrics[0] }) {
  return (
    <div className="flex-1 min-w-0">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
        {metric.label}
      </h4>
      <div className="space-y-3">
        {metric.items.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              className={`w-32 shrink-0 text-[12px] ${
                item.highlight ? 'font-semibold text-white' : 'text-white/40'
              }`}
            >
              {item.name}
            </span>
            <div className="relative flex-1 h-1.5 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.value}%`,
                  background: item.highlight
                    ? 'linear-gradient(to right, #60a5fa, #818cf8)'
                    : 'rgba(255,255,255,0.12)',
                }}
              />
            </div>
            <span
              className={`w-10 text-right text-[12px] tabular-nums ${
                item.highlight ? 'font-semibold text-white' : 'text-white/30'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PerformanceSection() {
  return (
    <section className="relative overflow-hidden bg-[#05070f] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Performa yang menonjol
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
            Kami membandingkan Leam dengan solusi pengembangan lain berdasarkan kecepatan, kualitas, dan konsistensi.
          </p>
        </div>

        {/* Charts */}
        <div className="flex flex-col gap-10 rounded-2xl border border-white/[0.06] bg-[#080b13] p-8 md:flex-row md:gap-12">
          {metrics.map((metric) => (
            <MetricGroup key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
