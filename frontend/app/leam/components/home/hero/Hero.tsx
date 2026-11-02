import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LaserFlow from './LaserFlow';
import heroScreen from '../../../../../assets/images/img.jpg';
import heroVideo from '../../../../../assets/videos/project-vid.mp4';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null); // proxy "lantai" untuk LaserFlow
  const laptopRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const slabRef = useRef<HTMLDivElement>(null); // tutup laptop saat tertutup total
  const lidRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const tabletFrameRef = useRef<HTMLDivElement>(null); // bagian yang di-flip (tidur → bangun)
  const tabletScreenRef = useRef<HTMLDivElement>(null); // penutup hitam: layar "mati" → menyala
  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const sub = subRef.current;
    const rings = ringsRef.current;
    const grid = gridRef.current;
    const surface = surfaceRef.current;
    const laptop = laptopRef.current;
    const panel = panelRef.current;
    const screenEl = screenRef.current;
    const slab = slabRef.current;
    const lid = lidRef.current;
    const glow = glowRef.current;
    const video = videoRef.current;
    const tablet = tabletRef.current;
    const tabletFrame = tabletFrameRef.current;
    const tabletScreen = tabletScreenRef.current;
    const phone = phoneRef.current;
    const phoneFrame = phoneFrameRef.current;
    const phoneScreen = phoneScreenRef.current;
    if (
      !section || !content || !line1 || !line2 || !sub || !rings || !grid ||
      !surface || !laptop || !panel || !screenEl || !slab || !lid || !glow ||
      !tablet || !tabletFrame || !tabletScreen || !phone || !phoneFrame || !phoneScreen
    ) {
      return;
    }

    /**
     * Proxy surface untuk LaserFlow (lihat perbaikan area hitam sebelumnya).
     * - Lebar  : selebar sisi bawah laptop (tanpa efek perspektif)
     * - Tinggi : gabungan bounding box layar dan "slab" tutup laptop, sehingga
     *            saat tertutup total sinar laser jatuh tepat di atas tutupnya.
     */
    const syncSurface = () => {
      const rect = screenEl.getBoundingClientRect();
      if (!rect.width) return;
      const slabRect = slab.getBoundingClientRect();
      const box = section.getBoundingClientRect();
      const scale = Number(gsap.getProperty(laptop, 'scale')) || 1;
      const flatWidth = Math.min(rect.width, panel.offsetWidth * scale);
      const top = Math.min(rect.top, slabRect.top);
      const bottom = Math.max(rect.bottom, slabRect.bottom);
      const centerX = rect.left + rect.width / 2;
      const radius = parseFloat(getComputedStyle(screenEl).borderTopLeftRadius) || 0;

      surface.style.width = `${flatWidth}px`;
      surface.style.height = `${bottom - top}px`;
      surface.style.borderRadius = `${radius * scale}px`;
      surface.style.transform = `translate3d(${centerX - flatWidth / 2 - box.left}px, ${top - box.top
        }px, 0)`;
    };

    ScrollTrigger.addEventListener('refresh', syncSurface);

    const mm = gsap.matchMedia();

    // ── Reduced motion: tanpa pin/scrub, tampilkan komposisi statis ──
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const vh = window.innerHeight;
      gsap.set(panel, { rotateX: 0, transformOrigin: 'bottom center' });
      gsap.set([lid, slab], { opacity: 0 });
      gsap.set(glow, { opacity: 1 });
      if (video) gsap.set(video, { opacity: 1 });
      gsap.set([line1, line2, sub], { opacity: 1, y: 0 });
      gsap.set(content, { y: -vh * 0.12 });
      gsap.set(laptop, { y: vh * 0.16, scale: 0.8 });
      gsap.set([tablet, phone], { opacity: 1, x: 0, y: 0 });
      gsap.set([tabletFrame, phoneFrame], { rotateX: 0 });
      gsap.set([tabletScreen, phoneScreen], { opacity: 0 });
      syncSurface();
    });

    // ── Motion normal ──
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Posisi awal: laptop tertutup duduk di bagian bawah viewport.
      const startOffset = () =>
        Math.max(0, window.innerHeight * 0.48 - laptop.offsetHeight / 2);

      // ── State awal: laptop TERTUTUP TOTAL (lid rebah 90°), headline di tengah ──
      gsap.set(panel, { rotateX: -90, transformOrigin: 'bottom center', force3D: true });
      gsap.set(slab, { opacity: 1 });
      gsap.set(lid, { opacity: 1 });
      gsap.set(glow, { opacity: 0 });
      if (video) gsap.set(video, { opacity: 0 });
      gsap.set([line1, line2, sub], { y: 0, opacity: 1 });
      gsap.set(laptop, { y: startOffset(), scale: 0.94, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: syncSurface,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=220%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ─── PARALAKS LATAR: tiap lapisan bergerak dengan kecepatan berbeda ───
      // Cincin membesar pelan (terasa mendekat), grid naik lebih lambat dari teks.
      tl.to(rings, { scale: 1.45, duration: 1 }, 0);
      tl.to(grid, { y: -80, duration: 1 }, 0);

      // ─── FASE 1 (0 → 0.46): headline jadi fokus lalu terurai ───
      // Baris atas paling dekat ke kamera → bergerak paling jauh; baris bawah lebih
      // pendek, sub-teks paling pendek. Jarak antar baris MELEBAR (tidak bertumpuk).
      tl.to(line1, { y: -170, duration: 0.46 }, 0);
      tl.to(line2, { y: -110, duration: 0.46 }, 0);
      tl.to(sub, { y: -60, duration: 0.4 }, 0);

      // Sub-teks hilang lebih dulu, lalu baris atas, lalu baris bawah.
      tl.to(sub, { opacity: 0, duration: 0.14 }, 0.06);
      tl.to(line1, { opacity: 0, duration: 0.2 }, 0.2);
      tl.to(line2, { opacity: 0, duration: 0.2 }, 0.26);

      // ─── FASE 2 (0.12 → 0.84): laptop naik dari bawah ke tengah ───
      tl.fromTo(
        laptop,
        { y: startOffset, scale: 0.94 },
        { y: 0, scale: 1, duration: 0.72, ease: 'sine.inOut' },
        0.12,
      );

      // ─── FASE 3 (0.26 → 0.78): tutup terangkat, layar menyala ───
      tl.to(slab, { opacity: 0, duration: 0.12 }, 0.26);
      tl.to(panel, { rotateX: 0, duration: 0.5, ease: 'sine.inOut' }, 0.28);
      tl.to(lid, { opacity: 0, duration: 0.2 }, 0.46);
      if (video) tl.to(video, { opacity: 1, duration: 0.18 }, 0.62);
      tl.to(glow, { opacity: 1, duration: 0.45 }, 0.3);

      // ─── FASE 4 (0.60 → 0.90): tablet & HP terbuka seperti tutup laptop ───
      // Engsel di sisi BELAKANG (dasar perangkat): mulai rebah menutup (rotateX -90°,
      // tak terlihat dari depan), lalu terangkat tegak (0°). Easing halus, TANPA overshoot
      // atau pantulan. Tablet lebih dulu, HP menyusul; layar menyala di akhir gerakan.
      tl.fromTo(tablet, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.6);
      tl.fromTo(
        tabletFrame,
        { rotateX: -90, transformOrigin: '50% 100%' },
        { rotateX: 0, duration: 0.24, ease: 'sine.inOut' },
        0.6,
      );

      tl.fromTo(phone, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.66);
      tl.fromTo(
        phoneFrame,
        { rotateX: -90, transformOrigin: '50% 100%' },
        { rotateX: 0, duration: 0.24, ease: 'sine.inOut' },
        0.66,
      );

      // Layar menyala di akhir gerakan masing-masing.
      tl.to(tabletScreen, { opacity: 0, duration: 0.1 }, 0.78);
      tl.to(phoneScreen, { opacity: 0, duration: 0.1 }, 0.84);

      // Fase tahan: tablet & HP melayang naik sedikit dengan kecepatan berbeda (kedalaman).
      tl.to(tablet, { y: -12, duration: 0.1 }, 0.9);
      tl.to(phone, { y: -22, duration: 0.1 }, 0.9);

      // Tahan di akhir supaya pin tidak lepas mendadak
      tl.to({}, { duration: 0.15 }, 0.85);

      syncSurface();
    });

    return () => {
      ScrollTrigger.removeEventListener('refresh', syncSurface);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[100svh] overflow-hidden bg-[#05070f]"
      data-purpose="hero-banner"
    >
      <style>{`
        @keyframes heroRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* backwards, bukan both: setelah selesai, transform dilepas
           sehingga tidak menimpa transform dari GSAP */
        .hero-rise { animation: heroRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise { animation: none; }
        }
      `}</style>

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <LaserFlow
          color="#3b82f6"
          beamPosition={0.5}
          surfaceRef={surfaceRef}
          intensity={1.7}
          beamWidth={1.4}
          flare={1.4}
          fog={0.22}
          dust={1.4}
          speed={1.2}
        />
      </div>

      {/* Proxy surface untuk LaserFlow — tak terlihat, posisinya diatur syncSurface() */}
      <div
        ref={surfaceRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 will-change-transform"
      />

      {/* Cincin — lapisan paralaks terjauh (membesar pelan) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div ref={ringsRef} className="relative will-change-transform">
          {[360, 540, 740, 960].map((size) => (
            <div
              key={size}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/[0.07]"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
      </div>

      {/* Grid — lapisan paralaks menengah (naik lebih lambat dari teks) */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-x-0 -inset-y-24 opacity-[0.035] will-change-transform"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 72%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,7,15,0.3)_55%,#05070f_100%)]" />

      {/* === HEADLINE — fokus utama; z di bawah laptop supaya tak pernah menimpa layar === */}
      <div
        ref={contentRef}
        className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pt-[26svh] text-center"
      >
        <h1
          className="hero-rise text-balance text-[clamp(2.4rem,7vw,5.75rem)] font-semibold leading-[1.04] tracking-tight text-white"
          style={{ animationDelay: '0.12s' }}
        >
          <span ref={line1Ref} className="block will-change-transform">
            Ubah Proses Manual
          </span>
          <span
            ref={line2Ref}
            className="block bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text pb-[0.08em] text-transparent will-change-transform"
          >
            Menjadi Sistem yang Simpel
          </span>
        </h1>

        <div ref={subRef} className="will-change-transform">
          <p
            className="hero-rise mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
            style={{ animationDelay: '0.2s' }}
          >
            Kami merancang dan membangun sistem digital yang rapi, cepat, dan mudah dipakai —
            menggantikan proses manual yang memakan waktu dan biaya.
          </p>
        </div>
      </div>

      {/* === LAPTOP — terpusat lewat flex; posisi awal (di bawah) diatur GSAP dengan y === */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
        <div ref={laptopRef} className="relative w-full max-w-[780px] will-change-transform">
          <div
            ref={glowRef}
            className="pointer-events-none absolute -top-8 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-blue-500/25 blur-[120px] will-change-[opacity]"
          />

          {/* Wrapper perspektif: mata sejajar engsel, jadi lid 90° benar-benar rata (tak terlihat) */}
          <div className="relative" style={{ perspective: '2000px', perspectiveOrigin: '50% 100%' }}>
            <div
              ref={panelRef}
              className="relative mx-auto rounded-[20px] border border-white/[0.14] bg-[linear-gradient(155deg,#43434a_0%,#26262b_28%,#131317_66%,#0b0b0e_100%)] p-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.8),0_30px_80px_-30px_rgba(37,99,235,0.45)] [will-change:transform] sm:rounded-[26px] sm:p-[9px]"
            >
              <div
                ref={screenRef}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[13px] bg-black ring-1 ring-black sm:rounded-[18px]"
              >
                {heroVideo ? (
                  <video
                    ref={videoRef}
                    src={heroVideo}
                    poster={heroScreen}
                    className="hero-media h-full w-full object-cover"
                    style={{ opacity: 0 }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={heroScreen}
                    alt="Pratinjau sistem digital buatan Leam"
                    className="hero-media h-full w-full object-cover"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
                <div className="pointer-events-none absolute -left-1/2 top-0 h-[160%] w-1/3 -rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-md" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Notch / camera */}
                <div className="absolute left-1/2 top-0 z-20 flex h-[14px] w-[26%] max-w-[150px] -translate-x-1/2 items-center justify-center rounded-b-[9px] bg-black sm:h-[18px]">
                  <span className="h-1 w-1 rounded-full bg-[#101318] ring-1 ring-white/10 sm:h-1.5 sm:w-1.5" />
                </div>

                {/* Lid overlay — memudar saat tutup terangkat */}
                <div
                  ref={lidRef}
                  aria-hidden="true"
                  className="absolute inset-0 z-30 overflow-hidden rounded-[inherit] bg-[radial-gradient(130%_120%_at_50%_0%,#303035_0%,#17171a_45%,#0a0a0c_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] [will-change:opacity]"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.07)_46%,transparent_62%)]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

                  <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-2.5 opacity-35">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="white" strokeWidth="1.2" />
                      </svg>
                      <span className="text-[11px] font-medium uppercase tracking-[0.42em] text-white">Lazdev</span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-px bg-black/60" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Tutup laptop saat TERTUTUP TOTAL — pelat tipis di atas engsel, memudar saat dibuka */}
            <div
              ref={slabRef}
              aria-hidden="true"
              className="absolute bottom-0 left-[-2%] right-[-2%] z-10 h-[16px] rounded-t-[10px] rounded-b-[2px] border border-b-0 border-white/[0.14] bg-[linear-gradient(to_bottom,#55555d_0%,#2c2c32_40%,#141418_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_-10px_40px_-12px_rgba(59,130,246,0.45)] will-change-[opacity] sm:h-[20px]"
            >
              <span className="absolute left-1/2 top-0 h-[3px] w-[16%] -translate-x-1/2 rounded-b-full bg-black/60" />
            </div>
          </div>

          {/* Hinge strip */}
          <div className="relative left-1/2 h-[6px] w-[97%] -translate-x-1/2 rounded-b-[2px] bg-gradient-to-b from-[#1a1a1e] to-[#0b0b0d]" />

          {/* Keyboard base */}
          <div className="relative left-1/2 h-[10px] w-[104%] -translate-x-1/2 rounded-b-[12px] bg-[linear-gradient(to_bottom,#4a4a51_0%,#2a2a30_42%,#141418_100%)] shadow-[0_20px_50px_-25px_rgba(37,99,235,0.35)] sm:h-[13px] sm:rounded-b-[16px]">
            <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
            <div className="absolute left-1/2 top-0 h-[55%] w-[18%] -translate-x-1/2 rounded-b-full bg-[#0a0a0c]" />
            <div className="absolute inset-x-8 bottom-0 h-px bg-black/50" />
          </div>

          {/* Pendar biru halus di bawah laptop */}
          <div className="relative mx-auto mt-3 h-10 w-[70%] rounded-[50%] bg-blue-500/10 blur-2xl" />

          {/*
            === TABLET & HP — muncul saat laptop terbuka ===
            Lapisan ini berdiri di "garis lantai" (tepat di dasar keyboard) dan ikut
            bergerak bersama laptop. Posisi horizontal dibatasi supaya tidak keluar layar:
            min(offset ideal, sisa margin kiri/kanan layar - 12px).
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[52px] z-30 h-0"
          >
            {/* Tablet (kanan) */}
            <div
              ref={tabletRef}
              className="absolute bottom-[-6px] w-[26%] will-change-transform sm:w-[28%]"
              style={{
                right: 'calc(-1 * min(14%, (100vw - 100%) / 2 - 12px))',
                // Mata sejajar engsel (seperti laptop): saat rebah 90° perangkat rata & tak terlihat.
                perspective: '1400px',
                perspectiveOrigin: '50% 100%',
              }}
            >
              <div
                ref={tabletFrameRef}
                className="relative aspect-[3/4] w-full [will-change:transform] rounded-[10px] border border-white/[0.14] bg-[linear-gradient(155deg,#43434a_0%,#26262b_28%,#131317_66%,#0b0b0e_100%)] p-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_50px_-18px_rgba(37,99,235,0.55)] sm:rounded-[18px] sm:p-[6px]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[7px] bg-black sm:rounded-[12px]">
                  <img
                    src={heroScreen}
                    alt=""
                    className="h-full w-full object-cover object-left"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.08)_46%,transparent_64%)]" />
                  {/* Penutup hitam: layar mati → menyala */}
                  <div ref={tabletScreenRef} className="absolute inset-0 z-10 bg-black" />
                </div>
                {/* Kamera depan */}
                <span className="absolute left-1/2 top-[1%] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#101318] ring-1 ring-white/10 sm:top-[1.6%]" />
              </div>
            </div>

            {/* HP (kiri) */}
            <div
              ref={phoneRef}
              className="absolute bottom-[-10px] w-[12%] will-change-transform sm:w-[13%]"
              style={{
                left: 'calc(-1 * min(9%, (100vw - 25%) / 2 - 32px))',
                perspective: '1400px',
                perspectiveOrigin: '50% 100%',
              }}
            >
              <div
                ref={phoneFrameRef}
                className="relative aspect-[9/19] w-full [will-change:transform] rounded-[12px] border border-white/[0.16] bg-[linear-gradient(155deg,#4a4a51_0%,#26262b_30%,#131317_68%,#0b0b0e_100%)] p-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_22px_44px_-16px_rgba(37,99,235,0.6)] sm:rounded-[22px] sm:p-[3px]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-black sm:rounded-[19px]">
                  <img
                    src={heroScreen}
                    alt=""
                    className="h-full w-full object-cover object-right"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.1)_44%,transparent_62%)]" />
                  {/* Dynamic island */}
                  <span className="absolute left-1/2 top-[2.6%] z-20 h-[2.6%] w-[34%] -translate-x-1/2 rounded-full bg-black" />
                  {/* Penutup hitam: layar mati → menyala */}
                  <div ref={phoneScreenRef} className="absolute inset-0 z-10 bg-black" />
                </div>
                {/* Tombol samping */}
                <span className="absolute -right-[2px] top-[22%] h-[9%] w-[2px] rounded-r bg-white/25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}