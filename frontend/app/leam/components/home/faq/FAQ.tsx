import { useState } from 'react';
import { LuMessageCircle, LuPlus, LuX } from 'react-icons/lu';

const faqs = [
  {
    question: 'Berapa lama waktu yang dibutuhkan untuk membangun sistem?',
    answer: 'Tergantung kompleksitas, biasanya 2–8 minggu. Sistem sederhana (manajemen order, booking) bisa selesai dalam 2 minggu. Sistem kompleks dengan banyak integrasi membutuhkan 6–8 minggu. Kami selalu memberikan timeline yang realistis sebelum mulai.',
  },
  {
    question: 'Apakah saya bisa meminta perubahan setelah sistem jadi?',
    answer: 'Ya! Setiap paket sudah termasuk sesi revisi. Kami menggunakan pendekatan iteratif sehingga Anda bisa melihat progress dan memberikan feedback setiap minggu. Setelah launch, kami menyediakan masa maintenance untuk perbaikan bug.',
  },
  {
    question: 'Apakah data saya aman?',
    answer: 'Keamanan adalah prioritas utama kami. Setiap sistem dilengkapi SSL end-to-end, enkripsi data, backup otomatis, dan audit log. Untuk enterprise, kami juga menyediakan SSO dan autentikasi dua faktor.',
  },
  {
    question: 'Sistem ini bisa diakses dari HP?',
    answer: 'Ya, semua sistem yang kami bangun bersifat mobile-first dan responsif. Bisa diakses dari smartphone, tablet, maupun komputer tanpa perlu install aplikasi terpisah.',
  },
  {
    question: 'Apakah bisa integrasi dengan sistem yang sudah ada?',
    answer: 'Bisa. Kami berpengalaman mengintegrasikan sistem dengan WhatsApp Business, payment gateway (Midtrans, Xendit), marketplace (Tokopedia, Shopee), ERP, akuntansi, dan berbagai API pihak ketiga lainnya.',
  },
  {
    question: 'Bagaimana proses konsultasinya?',
    answer: 'Mulai dengan konsultasi gratis 30 menit via Zoom atau WhatsApp. Kami akan memahami kebutuhan Anda, memberikan estimasi harga dan waktu, lalu menyiapkan proposal detail. Tidak ada komitmen di tahap ini.',
  },
];

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'border-white/15 bg-white/[0.04]'
          : 'border-white/[0.06] bg-[#080b13] hover:border-white/10'
      }`}
    >
      <button
        id={`faq-btn-${index}`}
        type="button"
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
        onClick={onToggle}
      >
        <span className={`text-sm font-medium leading-snug transition-colors ${isOpen ? 'text-white' : 'text-white/70'}`}>
          {faq.question}
        </span>
        <span className="mt-0.5 shrink-0 text-white/40">
          {isOpen ? <LuX className="h-4 w-4" /> : <LuPlus className="h-4 w-4" />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '200px' : '0px' }}
      >
        <p className="px-6 pb-5 text-[13px] leading-relaxed text-white/45">{faq.answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-[#05070f] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left - heading */}
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Jawaban atas pertanyaan Anda
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Tidak menemukan jawaban yang dicari?{' '}
              <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">
                Hubungi tim kami
              </a>
              {' '}untuk diskusi langsung.
            </p>

            {/* CTA card */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-900/30 to-indigo-900/20 p-6">
              <LuMessageCircle className="mb-3 h-6 w-6 text-blue-300" />
              <h3 className="text-base font-semibold text-white">Konsultasi Gratis 30 Menit</h3>
              <p className="mt-2 text-sm text-white/45">
                Ceritakan kebutuhan bisnis Anda, dan kami akan bantu temukan solusi terbaik.
              </p>
              <a
                id="faq-cta-btn"
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200 active:scale-95"
              >
                Mulai Konsultasi
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right - accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
