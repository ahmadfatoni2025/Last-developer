import { Link, useNavigate } from 'react-router';
import { LuArrowUpRight } from 'react-icons/lu';
import AnimatedContent from '../ui/AnimatedContent';
import ConcaveCarousel, { type ConcaveCarouselItem } from '../ui/Concavecarousel';

import orderImage from '../../../../../assets/images/portfolio/project-5.jpg';
import clinicImage from '../../../../../assets/images/portfolio/project-4.jpg';
import hrImage from '../../../../../assets/images/portfolio/project-3.jpg';
import stockImage from '../../../../../assets/images/portfolio/project-1.jpg';
import posImage from '../../../../../assets/images/portfolio/project-2.jpg';
import bookingImage from '../../../../../assets/images/img.jpg';

const templates: ConcaveCarouselItem[] = [
  {
    src: orderImage,
    alt: 'Contoh project Manajemen Order',
    title: 'Manajemen Order',
    subtitle: 'E-commerce',
    badge: 'E-commerce',
    accent: '#818cf8',
    href: '/project',
  },
  {
    src: clinicImage,
    alt: 'Contoh project Dashboard Klinik',
    title: 'Dashboard Klinik',
    subtitle: 'Kesehatan',
    badge: 'Kesehatan',
    accent: '#34d399',
    href: '/project',
  },
  {
    src: hrImage,
    alt: 'Contoh project Sistem HRD',
    title: 'Sistem HRD',
    subtitle: 'Human Resources',
    badge: 'Human Resources',
    accent: '#f59e0b',
    href: '/project',
  },
  {
    src: stockImage,
    alt: 'Contoh project Manajemen Stok',
    title: 'Manajemen Stok',
    subtitle: 'Retail & Gudang',
    badge: 'Retail & Gudang',
    accent: '#60a5fa',
    href: '/project',
  },
  {
    src: posImage,
    alt: 'Contoh project Point of Sale',
    title: 'Point of Sale',
    subtitle: 'Kasir & Toko',
    badge: 'Kasir & Toko',
    accent: '#e879f9',
    href: '/project',
  },
  {
    src: bookingImage,
    alt: 'Contoh project Sistem Booking',
    title: 'Sistem Booking',
    subtitle: 'Jasa & Layanan',
    badge: 'Jasa & Layanan',
    accent: '#fb923c',
    href: '/project',
  },
];

export function TemplateGallery() {
  const navigate = useNavigate();

  return (
    <section id="templates" className="relative overflow-hidden bg-[#05070f] px-5 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-indigo-600/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <AnimatedContent
          className="mb-6"
          distance={36}
          duration={0.8}
          ease="power3.out"
          blur={6}
          stagger={0.1}
          threshold={0.1}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Mulai lebih cepat dengan template kami
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Contoh sistem nyata yang sudah kami bangun untuk berbagai industri — siap dikustomisasi untuk kebutuhan bisnis Anda.
            </p>
          </div>
        </AnimatedContent>
      </div>

      {/* Dinding melengkung — dibuat selebar layar (full-bleed) agar lengkungnya terasa */}
      <div className="relative -mx-5">
        <ConcaveCarousel
          items={templates}
          className="h-[480px] sm:h-[560px]"
          size={0.64}
          distance={4}
          curvature={0.72}
          gap={16}
          radius={16}
          dim={0.35}
          reflection={0.06}
          autoplay="drift"
          speed={0.16}
          pauseOnHover
          ariaLabel="Portofolio project. Seret, gesek, atau gunakan tombol panah untuk memutar dinding."
          onSelect={(item) => item.href && navigate(item.href)}
        />
      </div>

      <div className="relative mx-auto mt-4 flex max-w-6xl items-center justify-between">
        <p className="text-[11px] text-white/25">Seret atau gunakan panah untuk memutar</p>
        <Link
          to="/project"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/50 transition-colors hover:text-white"
        >
          Lihat semua project
          <LuArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}