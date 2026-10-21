import { useRef } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import LaserFlow from './LaserFlow';
import heroScreen from '../../../../../assets/images/img.jpg';

const heroVideoSrc = 'assets/videos/demo-vid-3.mp4';

export function Hero() {
  const screenRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative isolate overflow-hidden bg-[#05070f]" data-purpose="hero-banner">
      <style>{`
        @keyframes heroRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
        }
        .hero-rise { animation: heroRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .hero-dot { animation: heroDot 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-dot { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <LaserFlow
          color="#3b82f6"
          beamPosition={0.5}
          surfaceRef={screenRef}
          intensity={1.7}
          beamWidth={1.4}
          flare={1.4}
          fog={0.22}
          dust={1.4}
          speed={1.2}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        {[360, 540, 740, 960].map((size) => (
          <div
            key={size}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/[0.07]"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 72%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,7,15,0.3)_55%,#05070f_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-7 pb-20 pt-10 text-center sm:pt-24">
        <h1
          className="hero-rise mt-6 max-w-4xl text-balance text-[clamp(2.5rem,6.4vw,4.5rem)] font-semibold leading-[1.03] tracking-tight text-white"
          style={{ animationDelay: '0.12s' }}
        >
          Ubah Proses Manual
          <span className="block bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Menjadi Sistem yang Simpel
          </span>
        </h1>

        <p
          className="hero-rise mt-5 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base"
          style={{ animationDelay: '0.2s' }}
        >
          Kami merancang dan membangun sistem digital yang rapi, cepat, dan mudah dipakai —
          menggantikan proses manual yang memakan waktu dan biaya.
        </p>

        <form
          className="hero-rise mt-8 flex w-full max-w-md flex-col gap-2 rounded-2xl border border-white/20 bg-white/[0.04] p-2 backdrop-blur-xl sm:flex-row sm:items-center"
          style={{ animationDelay: '0.28s' }}
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Email bisnis Anda"
            aria-label="Email bisnis"
            className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          <button
            type="submit"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.9)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_14px_36px_-10px_rgba(59,130,246,1)] active:scale-[0.98]"
          >
            Konsultasi Gratis
            <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>

        <p
          className="hero-rise mt-3 text-[11px] text-slate-100 bgsk bg-sky-900/40 shadow-olive-700 rounded-full px-2"
          style={{ animationDelay: '0.34s' }}
        >
          Gratis · Tanpa komitmen · Respon kurang dari 24 jam
        </p>

        <div
          className="hero-rise relative mt-14 w-full max-w-4xl sm:mt-16"
          style={{ animationDelay: '0.42s' }}
        >
          <div className="pointer-events-none absolute inset-x-6 top-4 h-56 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative mx-auto rounded-t-[16px] border border-white/15 bg-gradient-to-b from-[#3a4150] via-[#161a21] to-[#0a0c11] p-[5px] shadow-[0_60px_140px_-40px_rgba(37,99,235,0.65)] sm:rounded-t-[24px] sm:p-[9px]">
            <div
              ref={screenRef}
              className="relative aspect-[18/10] w-full overflow-hidden rounded-t-[11px] bg-[#04060b] sm:rounded-t-[16px]"
            >
              {heroVideoSrc ? (
                <video
                  src={heroVideoSrc}
                  poster={heroScreen}
                  className="h-full w-full object-cover zoom-125"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={heroScreen}
                  alt="Pratinjau sistem digital buatan Leam"
                  className="h-full w-full object-cover"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
              <div className="pointer-events-none absolute -left-1/2 top-0 h-[160%] w-1/3 -rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-md" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute left-1/2 top-0 h-[10px] w-20 -translate-x-1/2 rounded-b-[8px] bg-[#05070f] sm:h-4 sm:w-28" />
              <div className="absolute left-1/2 top-[3px] h-1 w-1 -translate-x-1/2 rounded-full bg-[#111827] sm:top-1.5" />
            </div>
          </div>

          <div className="relative left-1/2 h-2 w-[101%] -translate-x-1/2 rounded-b-[6px] bg-gradient-to-b from-[#0b0e13] to-[#1b2029]" />

          <div className="relative left-1/2 h-4 w-[108%] -translate-x-1/2 rounded-b-[12px] bg-gradient-to-b from-[#d7dbe2] via-[#9aa1ab] to-[#5c636e] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] sm:h-5 sm:w-[112%]">
            <div className="absolute inset-x-0 top-0 h-px bg-white/90" />
            <div className="absolute left-1/2 top-0 h-2 w-24 -translate-x-1/2 rounded-b-full bg-[#3b414a]" />
            <div className="absolute inset-x-6 bottom-0 h-px bg-black/40" />
          </div>

          <div className="relative mx-auto mt-2 h-10 w-[86%] rounded-[50%] bg-blue-500/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
