import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const testimonials = [
  {
    company: 'Toko Baju Nusantara',
    category: 'Fashion & Retail',
    name: 'Siti Rahayu',
    role: 'Direktur Operasional',
    quote: '"Kami sudah 3 tahun pakai spreadsheet yang berantakan. Leam membangunkan sistem manajemen order dalam 3 minggu, dan sekarang seluruh tim bisa bekerja dari mana saja. Omzet kami naik 40% karena tidak ada lagi order yang terlewat."',
    rating: 5,
    avatar: 'SR',
    bgColor: 'from-purple-900/40 to-indigo-900/20',
  },
  {
    company: 'Klinik Sehat Plus',
    category: 'Layanan Kesehatan',
    name: 'dr. Ahmad Fauzi',
    role: 'Pemilik & Dokter',
    quote: '"Sebagai klinik yang tidak punya tim IT, kami butuh sistem yang mudah. Leam membangun sistem pendaftaran dan rekam medis yang bisa diakses dokter dan perawat dari HP. Antrian pasien berkurang 60%."',
    rating: 5,
    avatar: 'AF',
    bgColor: 'from-emerald-900/40 to-teal-900/20',
  },
  {
    company: 'CV Sinar Abadi',
    category: 'Distributor',
    name: 'Budi Santoso',
    role: 'CEO',
    quote: '"ROI dari sistem Leam sudah terasa di bulan pertama. Monitoring stok gudang yang dulu manual dan error-prone sekarang real-time. Tim saya tidak perlu lagi WhatsApp-an untuk cek ketersediaan barang."',
    rating: 5,
    avatar: 'BS',
    bgColor: 'from-blue-900/40 to-sky-900/20',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'text-amber-400' : 'text-white/15'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden bg-[#080b13] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dipercaya tim di seluruh Indonesia
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              id="testimonial-prev"
              type="button"
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white transition-all"
            >
              <LuChevronLeft className="h-4 w-4" />
            </button>
            <button
              id="testimonial-next"
              type="button"
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white transition-all"
            >
              <LuChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main testimonial */}
        <div
          key={active}
          className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${t.bgColor} p-8 md:p-10`}
          style={{ animation: 'fadeSlideIn 0.4s ease' }}
        >
          <style>{`
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateX(20px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left - text */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/60">
                  {t.category}
                </span>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">{t.company}</h3>
                <p className="mt-5 text-[15px] leading-relaxed text-white/65">{t.quote}</p>
              </div>
              <div className="mt-8">
                <StarRating rating={t.rating} />
                <div className="mt-3">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Right - avatar */}
            <div className="flex items-center justify-center">
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/30 border border-white/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-white/70">{t.avatar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              id={`testimonial-dot-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? 'w-8 bg-blue-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
