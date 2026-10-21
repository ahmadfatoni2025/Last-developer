import { useState } from 'react';
import { LuPenLine, LuRocket, LuSparkles, LuTarget } from 'react-icons/lu';

const steps = [
  {
    number: '01',
    title: 'Deskripsikan',
    description: 'Ceritakan kebutuhan bisnis Anda. Sistem apa yang ingin dibangun, proses apa yang ingin diotomasi — tim kami mendengarkan.',
    icon: LuPenLine,
    accent: '#60a5fa',
  },
  {
    number: '02',
    title: 'Rancang',
    description: 'Tim kami merancang arsitektur sistem, UI/UX, dan alur kerja yang sesuai kebutuhan Anda — siap produksi.',
    icon: LuSparkles,
    accent: '#a78bfa',
  },
  {
    number: '03',
    title: 'Kembangkan',
    description: 'Pengembangan iteratif dengan update progres setiap minggu. Anda bisa melihat dan mencoba sistem secara langsung.',
    icon: LuRocket,
    accent: '#34d399',
  },
  {
    number: '04',
    title: 'Luncurkan',
    description: 'Deploy, pelatihan tim, dan dukungan purna jual. Sistem Anda siap digunakan dan terus kami pelihara.',
    icon: LuTarget,
    accent: '#f59e0b',
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#080b13] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Dari ide ke sistem jadi dalam empat langkah simpel
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/45">
            Proses yang terbukti menghasilkan sistem berkualitas tinggi, tepat waktu, dan sesuai anggaran.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
            <div
              key={step.title}
              id={`step-card-${i}`}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${
                activeStep === i
                  ? 'border-white/20 bg-[#0e1220]'
                  : 'border-white/[0.06] bg-[#080b13] hover:border-white/10'
              }`}
              onClick={() => setActiveStep(i)}
            >
              {/* Number */}
              <div
                className="mb-4 text-4xl font-black tracking-tighter"
                style={{ color: activeStep === i ? step.accent : 'rgba(255,255,255,0.08)' }}
              >
                {step.number}
              </div>

              {/* Emoji */}
              <Icon className="mb-4 h-7 w-7" style={{ color: step.accent }} />

              {/* Title */}
              <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>

              {/* Description */}
              <p className="text-[13px] leading-relaxed text-white/45">{step.description}</p>

              {/* Active indicator */}
              {activeStep === i && (
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ background: `linear-gradient(to right, ${step.accent}, transparent)` }}
                />
              )}
            </div>
            );
          })}
        </div>

        {/* Connector line (desktop) */}
        <div className="mt-8 hidden items-center justify-between lg:flex px-[7%]">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className="h-2 w-2 rounded-full transition-all duration-300"
                style={{ background: activeStep >= i ? step.accent : 'rgba(255,255,255,0.1)' }}
              />
              {i < steps.length - 1 && (
                <div
                  className="h-px flex-1 mx-2 transition-all duration-500"
                  style={{
                    background: activeStep > i
                      ? `linear-gradient(to right, ${step.accent}, ${steps[i+1].accent})`
                      : 'rgba(255,255,255,0.07)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
