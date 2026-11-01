import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import {
  LuArrowUpRight,
  LuAward,
  LuBadgeCheck,
  LuFolder,
  LuPlus,
  LuSparkles,
} from 'react-icons/lu';

import type { Route } from './+types/team';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type Member = {
  name: string;
  role: string;
  bio: string;
  image: string;
  projects: string;
  experience: string;
};

const members: Member[] = [
  {
    name: 'Ahmad Fatoni',
    role: 'Front End & UI/UX Designer',
    bio: 'Membangun antarmuka aplikasi yang responsif, cepat, dan mudah digunakan. Bertanggung jawab dalam menerjemahkan kebutuhan pengguna menjadi desain UI/UX yang intuitif serta mengimplementasikannya menjadi kode front end yang optimal.',
    image:
      '/./images/team/toni.png',
    projects: '24 Projects',
    experience: '5 Years',
  },
  {
    name: 'Nowo Abimanyu',
    role: 'Backend Developer & System Design',
    bio: 'Merancang dan membangun arsitektur backend, mengelola database, API, serta memastikan sistem berjalan aman, stabil, dan skalabel. Bertanggung jawab atas logika bisnis, integrasi data, dan performa server-side aplikasi.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&h=1000&q=80&crop=faces',
    projects: '31 Projects',
    experience: '6 Years',
  },
];

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Team — leam' },
    {
      name: 'description',
      content: 'Meet the people behind the work at Leam.',
    },
  ];
}

export default function Team() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const ctx = gsap.context(() => {
      if (reduce) return;

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('.team-eyebrow', { opacity: 0, y: 12, duration: 0.6 }, 0.05)
        .from('.team-heading-line', { yPercent: 110, duration: 0.95, stagger: 0.08 }, 0.14)
        .from('.team-sub', { opacity: 0, y: 14, duration: 0.7 }, 0.42)
        .from('.team-card', { opacity: 0, y: 44, duration: 0.85, stagger: 0.08 }, 0.5)
        .from('.team-end', { opacity: 0, duration: 0.6 }, 0.9);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[#05070f] text-white"
      aria-label="Tim Leam"
    >
      <style>{`
        @keyframes teamCardGlow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
        .team-card-halo { animation: teamCardGlow 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .team-card-halo { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-y-0 left-1/3 hidden w-px bg-white/[0.055] md:block" />
        <div className="absolute inset-y-0 left-2/3 hidden w-px bg-white/[0.055] md:block" />
        <div className="absolute left-1/2 top-[14%] h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-blue-600/[0.12] blur-[130px]" />
        <div className="absolute -left-40 -top-52 h-[34rem] w-[34rem] rounded-full bg-blue-600/[0.08] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 50% 18%, black 5%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 18%, black 5%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-6 sm:px-8 sm:pb-24 sm:pt-8">
        <header className="mx-auto mt-20 max-w-3xl text-center sm:mt-28">

          <h1 className="mt-6 text-[clamp(2.6rem,6.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
            <span className="block overflow-hidden pb-1">
              <span className="team-heading-line block">
                Meet the{' '}
                <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  people
                </span>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="team-heading-line block">behind the work.</span>
            </span>
          </h1>

          <p className="team-sub mx-auto mt-6 max-w-md text-[13px] leading-relaxed text-white/45 sm:text-[14px]">
            A tight-knit team of designers, engineers, and strategists building digital products
            that move brands forward.
          </p>
        </header>

        <div className="mt-16 flex flex-wrap justify-center gap-5 sm:mt-20 sm:gap-6">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="team-card group relative w-full max-w-[24rem] sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
            >
              {/* Halo glow di atas card */}
              <div
                className="team-card-halo pointer-events-none absolute -top-14 left-1/2 h-20 w-28 -translate-x-1/2 bg-gradient-to-b from-transparent to-cyan-300/30 blur-2xl"
                aria-hidden="true"
              />

              {/* Border gradient + shadow */}
              <div className="relative rounded-[28px] bg-gradient-to-b from-cyan-300/60 via-blue-500/25 to-blue-900/10 p-px shadow-[0_0_35px_-12px_rgba(56,189,248,0.35),0_30px_60px_-35px_rgba(37,99,235,0.55)] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_0_45px_-10px_rgba(56,189,248,0.45),0_40px_70px_-35px_rgba(37,99,235,0.7)]">
                <article
                  className="relative overflow-hidden rounded-[27px] text-white"
                  style={{
                    backgroundImage:
                      'radial-gradient(130% 95% at 50% 100%, #1f66ff 0%, #0d3b9c 38%, #081b3a 68%, #060d18 100%)',
                  }}
                >
                  {/* Foto */}
                  <div className="relative h-[18rem] overflow-hidden sm:h-[19rem]">
                    <img
                      src={member.image}
                      alt={`Foto ${member.name}`}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      draggable={false}
                      className="h-full w-full select-none object-cover object-top saturate-[0.92] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[#1d4ed8]/10 mix-blend-color" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#060d18]/10 via-transparent to-[#060d18]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08142b] to-transparent" />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060d18] via-[#071a38]/65 to-transparent backdrop-blur-[10px]"
                      style={{
                        maskImage: 'linear-gradient(to top, black 22%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 22%, transparent 100%)',
                      }}
                    />

                    {/* Badge role di atas foto */}
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100/90 backdrop-blur-md">
                      {member.role}
                    </span>
                  </div>

                  {/* Konten */}
                  <div className="relative -mt-14 px-5 pb-6 sm:px-6">
                    <div className="relative">
                      <div
                        className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-2xl bg-gradient-to-r from-blue-500/30 via-cyan-400/10 to-transparent backdrop-blur-md"
                        style={{
                          maskImage: 'linear-gradient(to right, black 58%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to right, black 58%, transparent 100%)',
                        }}
                        aria-hidden="true"
                      />

                      <div className="relative flex items-center gap-1.5">
                        <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-white">
                          {member.name}
                        </h2>
                        <LuBadgeCheck
                          size={16}
                          className="shrink-0 text-cyan-300"
                          aria-label="Terverifikasi"
                        />
                      </div>

                      {/* Garis aksen kecil di bawah nama */}
                      <span className="mt-2 block h-px w-10 bg-gradient-to-r from-cyan-300/80 to-transparent" />
                    </div>

                    {/* Bio */}
                    <div className="mt-4">
                      <p className="text-[12.5px] leading-[1.65] text-white/75">
                        {member.bio}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="mt-5 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />

                    {/* Footer: stats + CTA */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.1em] text-white/60">
                        <span className="inline-flex items-center gap-1.5">
                          <LuFolder size={13} aria-hidden="true" className="text-cyan-300/80" />
                          {member.projects}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <LuAward size={13} aria-hidden="true" className="text-cyan-300/80" />
                          {member.experience}
                        </span>
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#07111f] transition-all duration-300 hover:bg-cyan-100 hover:shadow-[0_0_20px_-4px_rgba(103,232,249,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]"
                        aria-label={`Hubungi ${member.name}`}
                      >
                        Connect
                        <LuPlus size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
