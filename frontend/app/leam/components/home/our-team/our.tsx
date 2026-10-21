import member1 from '../../../../../assets/images/team/member-1.jpg';
import member2 from '../../../../../assets/images/team/member-2.jpg';
import member3 from '../../../../../assets/images/team/member-3.jpg';

type Member = {
  name: string;
  role: string;
  badge: string;
  focus: string;
  projects: string;
  bio: string;
  tags: string[];
  photo: string;
};

const members: Member[] = [
  {
    name: 'Raka Pratama',
    role: 'Fullstack Developer',
    badge: 'Developer',
    focus: '6 thn',
    projects: '32',
    bio: 'Membangun sistem end-to-end dengan fokus pada performa dan skalabilitas.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    photo: member1,
  },
  {
    name: 'Sinta Maharani',
    role: 'UI / UX Designer',
    badge: 'Designer',
    focus: '5 thn',
    projects: '27',
    bio: 'Merancang alur kerja yang sederhana dan antarmuka yang mudah dipakai.',
    tags: ['Figma', 'Design System', 'Riset UX'],
    photo: member2,
  },
  {
    name: 'Bagas Nugroho',
    role: 'Backend Engineer',
    badge: 'Engineer',
    focus: '7 thn',
    projects: '41',
    bio: 'Menangani arsitektur data, API, dan integrasi yang aman.',
    tags: ['API', 'Laravel', 'Redis'],
    photo: member3,
  },
];

function TeamCard({ member }: { member: Member }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080b13] transition-all duration-500 hover:border-blue-400/30 hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.55)] focus-within:opacity-100 sm:opacity-60 sm:hover:opacity-100">
      {/* Portrait */}
      <div className="relative h-[300px] overflow-hidden sm:h-[320px]">
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105 sm:grayscale-[45%] sm:brightness-90 sm:group-hover:grayscale-0 sm:group-hover:brightness-100"
          loading="lazy"
        />

        {/* Dark wash, cleared on hover */}
        <div className="pointer-events-none absolute inset-0 bg-[#05070f]/40 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Blend into card body */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#080b13] via-[#080b13]/70 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
          {member.badge}
        </span>
      </div>

      {/* Content */}
      <div className="relative -mt-20 px-5 pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">{member.role}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{member.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-white/50">{member.bio}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/10 pt-3.5">
          {member.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/40">
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[10px] text-white/30">
          {member.focus} pengalaman · {member.projects} proyek
        </p>
      </div>
    </article>
  );
}

export default function OurTeam() {
  return (
    <section className="relative overflow-hidden bg-[#05070f] px-5 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
            Our Team
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight text-white">
            Orang di balik sistem
            <br className="hidden sm:block" />{' '}
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              yang simpel
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            Tim kecil yang berpengalaman membangun sistem digital — dari riset, desain, sampai
            implementasi dan pendampingan.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
