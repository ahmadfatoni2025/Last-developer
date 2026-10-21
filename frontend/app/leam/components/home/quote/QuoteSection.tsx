// Full-screen dark quote section like Kraft's "If you can dream it..." section

export function QuoteSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-5 py-24">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-[clamp(1.75rem,5vw,3.5rem)] font-light leading-[1.25] tracking-tight text-white/90">
          "Jika Anda bisa membayangkan prosesnya,{' '}
          <span className="font-semibold text-white">
            kami bisa membangunkan sistemnya.
          </span>
          "
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-white/20" />
          <p className="text-sm font-medium text-white/40">Leam Collective — Sistem Digital untuk Bisnis Indonesia</p>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
