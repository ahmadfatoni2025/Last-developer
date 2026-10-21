import { LuRocket } from 'react-icons/lu';

// CTA section - final call to action before footer
export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.7) 0%, rgba(59,130,246,0.3) 50%, transparent 80%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300">
          <LuRocket className="h-3.5 w-3.5" />
          Mulai tanpa risiko
        </div>

        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Siap mengubah bisnis Anda{' '}
          <br />
          <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            dengan sistem digital?
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
          Mulai dengan konsultasi gratis. Tidak ada komitmen, tidak ada biaya tersembunyi.
          Kami akan bantu Anda memahami solusi terbaik untuk bisnis.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            id="cta-primary-btn"
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-[1.04] transition-all duration-300 active:scale-95"
          >
            Konsultasi Gratis
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            id="cta-secondary-btn"
            href="#prices"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/25 hover:bg-white/[0.09] transition-all duration-300"
          >
            Lihat Harga
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-white/30">
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Konsultasi gratis
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Tanpa biaya tersembunyi
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Garansi bug
          </span>
        </div>
      </div>
    </section>
  );
}
