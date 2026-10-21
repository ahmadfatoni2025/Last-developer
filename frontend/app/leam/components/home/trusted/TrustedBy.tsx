import {
  LuBuilding2,
  LuCar,
  LuPill,
  LuShirt,
  LuShoppingBag,
  LuSmartphone,
  LuStethoscope,
  LuStore,
  LuUtensilsCrossed,
  LuWrench,
} from 'react-icons/lu';

const logos = [
  { name: 'Toko Baju Nusantara', icon: LuShoppingBag },
  { name: 'Klinik Sehat Plus', icon: LuStethoscope },
  { name: 'Bengkel Motor Jaya', icon: LuWrench },
  { name: 'CV Sinar Abadi', icon: LuBuilding2 },
  { name: 'Apotek Sejahtera', icon: LuPill },
  { name: 'Restoran Padang Raya', icon: LuUtensilsCrossed },
  { name: 'Laundry Express', icon: LuShirt },
  { name: 'Toko Elektronik Maju', icon: LuSmartphone },
  { name: 'Rental Mobil Sentosa', icon: LuCar },
  { name: 'Butik Modern', icon: LuStore },
];

export function TrustedBy() {
  return (
    <section className="overflow-hidden border-y border-white/[0.06] bg-[#05070f] py-12">
      <div className="mx-auto mb-6 max-w-6xl px-5 text-center">
        <p className="text-sm text-white/35 tracking-wide">
          Dipercaya tim yang lebih cepat berinovasi bersama Leam
        </p>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#05070f] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#05070f] to-transparent" />

        <div className="flex animate-marquee gap-6 whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => {
            const Icon = logo.icon;
            return (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/50 hover:border-white/15 hover:text-white/80 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-blue-300/80" />
                {logo.name}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
