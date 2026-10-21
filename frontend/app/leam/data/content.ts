export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'Live' | 'Beta' | 'In review';
  members: number;
  monogram: string;
  cover: string;
  tags: string[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
}

export interface Stat {
  value: string;
  label: string;
  delta?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const heroCenter = {
  badge: { neutral: 'A Laizs company', accent: 'software technology' },
  headlineTop: 'Meet! lazDev',
  headlineBottom: 'Software engineering, under Laizs.',
  subtext:
    'lazDev adalah perusahaan di bawah Laizs yang bergerak di bidang teknologi software. Kami membangun produk digital dan infrastruktur yang dipakai setiap hari — termasuk leam.',
  primaryCta: { label: 'Get early access', to: '/project' },
  secondaryCta: { label: 'See how it works', to: '/team' }
};

export const floatLabels = [
  { label: 'Backend', pos: 'left-[4%] top-[26%]' },
  { label: 'Frontend', pos: 'left-[12%] top-[64%]' },
  { label: 'Infra', pos: 'left-[24%] top-[84%]' },
  { label: 'Security', pos: 'right-[5%] top-[22%]' },
  { label: 'Mobile', pos: 'right-[8%] top-[58%]' },
  { label: 'Data', pos: 'right-[22%] top-[82%]' }
];

export const stats: Stat[] = [
  { value: '2.4M', label: 'Active rooms', delta: '+18%' },
  { value: '840K', label: 'Paid members', delta: '+26%' },
  { value: '99.98%', label: 'Uptime', delta: '30d' },
  { value: '190+', label: 'Countries', delta: '+9' }
];

export const features: Feature[] = [
  {
    id: 'rooms',
    title: 'Live rooms',
    description: 'Multi-party video with spatial audio, built for small communities that talk for hours.'
  },
  {
    id: 'tickets',
    title: 'Tickets & subs',
    description: 'Sell access, bundles, and recurring memberships without a third-party checkout.'
  },
  {
    id: 'vault',
    title: 'Collectibles',
    description: 'Issue drops and unlock perks that stay with members across every room.'
  },
  {
    id: 'analytics',
    title: 'Room analytics',
    description: 'See retention, peak concurrency, and where conversations turn into revenue.'
  }
];

export const projects: Project[] = [
  {
    id: 'aurora',
    title: 'Aurora Live',
    category: 'Streaming',
    description: 'Late-night music rooms with a shared stage and tip rails for the artist on air.',
    status: 'Live',
    members: 12840,
    monogram: 'A',
    cover: 'from-[#f59e0b]/30 via-[#eef2f6] to-[#ffffff]',
    tags: ['Video', 'Tips']
  },
  {
    id: 'stellar',
    title: 'Stellar Rooms',
    category: 'Spaces',
    description: 'Drop-in voice lounges that persist between sessions, so context never gets lost.',
    status: 'Live',
    members: 9420,
    monogram: 'S',
    cover: 'from-[#5eead4]/25 via-[#eef2f6] to-[#ffffff]',
    tags: ['Voice', 'Persistent']
  },
  {
    id: 'nova',
    title: 'Nova Tickets',
    category: 'Commerce',
    description: 'One checkout for passes, bundles, and merch — reconciled to the member ledger.',
    status: 'Beta',
    members: 6210,
    monogram: 'N',
    cover: 'from-[#a78bfa]/25 via-[#eef2f6] to-[#ffffff]',
    tags: ['Payments', 'Ledger']
  },
  {
    id: 'echo',
    title: 'Echo Community',
    category: 'Chat',
    description: 'Threaded chat that keeps voice, video, and text attached to the same moment in time.',
    status: 'Live',
    members: 21560,
    monogram: 'E',
    cover: 'from-[#f472b6]/25 via-[#eef2f6] to-[#ffffff]',
    tags: ['Threads', 'Moderation']
  },
  {
    id: 'prism',
    title: 'Prism Marketplace',
    category: 'Collectibles',
    description: 'Mint room passes as tradable collectibles with holder-only channels.',
    status: 'In review',
    members: 3180,
    monogram: 'P',
    cover: 'from-[#38bdf8]/25 via-[#eef2f6] to-[#ffffff]',
    tags: ['NFT', 'Gating']
  },
  {
    id: 'pulse',
    title: 'Pulse Subscriptions',
    category: 'Recurring',
    description: 'Tiered memberships with automatic perks delivery and grace-period handling.',
    status: 'Live',
    members: 15770,
    monogram: 'P',
    cover: 'from-[#34d399]/25 via-[#eef2f6] to-[#ffffff]',
    tags: ['Recurring', 'Perks']
  }
];

export const team: Member[] = [
  {
    id: 'nadia',
    name: 'Nadia Rahman',
    role: 'Co-founder · CEO',
    bio: 'Built community tooling at scale for three years before deciding the stack should start with the room.',
    initials: 'NR',
    accent: 'from-[#f59e0b] to-[#b45309]'
  },
  {
    id: 'tomas',
    name: 'Tomas Vlk',
    role: 'Co-founder · CTO',
    bio: 'Distributed systems engineer. Spends most of her time on sync and making latency invisible.',
    initials: 'TV',
    accent: 'from-[#5eead4] to-[#0f766e]'
  },
  {
    id: 'kiko',
    name: 'Kiko Adeyemi',
    role: 'Head of Design',
    bio: 'Believes moderation UX is a first-class surface, not a settings page you hide.',
    initials: 'KA',
    accent: 'from-[#a78bfa] to-[#6d28d9]'
  },
  {
    id: 'sora',
    name: 'Sora Lindqvist',
    role: 'Head of Community',
    bio: 'Ran 40k-member communities. Now makes sure the tooling survives real behaviour, not ideal flows.',
    initials: 'SL',
    accent: 'from-[#f472b6] to-[#be185d]'
  }
];

export const contact = {
  title: 'Want a room of your own?',
  description:
    'Tell us what kind of community you are building and we will get you a private build within a week.',
  email: 'hello@leam.studio',
  location: 'Lisbon · Remote-first',
  socials: [
    { label: 'Twitter', handle: '@leamstudio' },
    { label: 'GitHub', handle: '/leam' },
    { label: 'Discord', handle: '/leam' }
  ],
  cta: { label: 'Start a conversation', to: '/contact' }
} as const;