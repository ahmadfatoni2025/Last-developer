import { useState } from 'react';
import { Link } from 'react-router';
import { LuCheck, LuMinus, LuStar } from 'react-icons/lu';
import StarBorder from '../ui/StarBorder';

type Plan = {
    name: string;
    tagline: string;
    monthly: string;
    yearly: string;
    features: string[];
    footer: string;
    cta: string;
    featured?: boolean;
};

const plans: Plan[] = [
    {
        name: 'Starter',
        tagline: 'Cocok untuk UMKM & tim kecil',
        monthly: '2,5jt',
        yearly: '25jt',
        features: [
            'Hingga 5 modul / halaman',
            'Desain UI kustom',
            'Responsif mobile & desktop',
            'Database terkelola',
            'Backup mingguan',
            'Pendampingan 1 sesi',
        ],
        footer: 'Konsultasi gratis 30 menit',
        cta: 'Mulai Gratis',
    },
    {
        name: 'Bisnis',
        tagline: 'Untuk tim yang sedang berkembang',
        monthly: '7,5jt',
        yearly: '75jt',
        features: [
            'Hingga 15 modul / halaman',
            'Semua fitur Starter',
            'Dashboard admin & role akses',
            '3 integrasi pihak ketiga',
            'Backup harian',
            'Maintenance 3 bulan',
            'Pendampingan 3 sesi',
        ],
        footer: '30 hari garansi bug',
        cta: 'Mulai Gratis',
        featured: true,
    },
    {
        name: 'Enterprise',
        tagline: 'Untuk perusahaan & kebutuhan custom',
        monthly: '15jt',
        yearly: '150jt',
        features: [
            'Modul tanpa batas',
            'Semua fitur Bisnis',
            'SSO & autentikasi 2 faktor',
            'Integrasi tanpa batas',
            'Backup real-time',
            'Maintenance 12 bulan',
            'Dedicated support & pelatihan',
        ],
        footer: 'SLA respons 4 jam',
        cta: 'Hubungi Sales',
    },
];

type Cell = boolean | string;

type ComparisonGroup = {
    group: string;
    rows: { label: string; values: [Cell, Cell, Cell] }[];
};

const comparison: ComparisonGroup[] = [
    {
        group: 'Pengembangan',
        rows: [
            { label: 'Jumlah modul / halaman', values: ['5', '15', 'Tanpa batas'] },
            { label: 'Desain UI kustom', values: [true, true, true] },
            { label: 'Responsif mobile & desktop', values: [true, true, true] },
            { label: 'Dashboard admin', values: [false, true, true] },
            { label: 'Role & hak akses pengguna', values: [false, true, true] },
            { label: 'Multi-bahasa', values: [false, '2 bahasa', 'Tanpa batas'] },
        ],
    },
    {
        group: 'Integrasi & Data',
        rows: [
            { label: 'Integrasi pihak ketiga', values: ['1', '3', 'Tanpa batas'] },
            { label: 'Notifikasi WhatsApp / email', values: [true, true, true] },
            { label: 'Payment gateway', values: [false, true, true] },
            { label: 'Import & export data', values: [true, true, true] },
            { label: 'Akses API', values: [false, true, true] },
            { label: 'Backup otomatis', values: ['Mingguan', 'Harian', 'Real-time'] },
        ],
    },
    {
        group: 'Keamanan',
        rows: [
            { label: 'SSL & enkripsi data', values: [true, true, true] },
            { label: 'Audit log aktivitas', values: [false, true, true] },
            { label: 'SSO / autentikasi 2 faktor', values: [false, false, true] },
        ],
    },
    {
        group: 'Dukungan',
        rows: [
            { label: 'Onboarding', values: ['1 sesi', '3 sesi', 'Dedicated'] },
            { label: 'SLA respons', values: ['3 hari', '24 jam', '4 jam'] },
            { label: 'Masa maintenance', values: ['—', '3 bulan', '12 bulan'] },
            { label: 'Pelatihan tim', values: [false, true, true] },
            { label: 'Garansi bug', values: ['14 hari', '30 hari', '90 hari'] },
        ],
    },
];

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
    const featured = Boolean(plan.featured);

    const body = (
        <>
            {featured && (
                <div className="pointer-events-none absolute right-0 top-0 -z-1 h-44 w-44 bg-[radial-gradient(circle,rgba(147,197,253,0.35)_1px,transparent_1px)] [background-size:7px_7px] [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
            )}

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                        <p className={`mt-1 text-sm ${featured ? 'text-blue-200/60' : 'text-white/45'}`}>{plan.tagline}</p>
                    </div>
                    {featured && (
                        <span className="rounded-full border border-blue-300/30 bg-blue-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-200">
                            Populer
                        </span>
                    )}
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-white">
                        Rp {yearly ? plan.yearly : plan.monthly}
                    </span>
                    <span className="text-sm text-white/40">/{yearly ? 'thn' : 'bln'}</span>
                </div>
                <p className="mt-1 text-xs text-white/40">
                    {yearly ? 'Ditagih tahunan · hemat 17%' : 'Ditagih bulanan · berhenti kapan saja'}
                </p>

                <button
                    type="button"
                    className={
                        featured
                            ? 'mt-5 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02] active:scale-95'
                            : 'mt-5 w-full rounded-lg border border-white/15 bg-white/[0.06] py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/[0.1] active:scale-95'
                    }
                >
                    {plan.cta}
                </button>

                <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-[13px] text-white/55">
                            <LuCheck className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-blue-500/15 p-0.5 text-blue-300" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/40">{plan.footer}</p>
            </div>
        </>
    );

    if (!featured) {
        return (
            <div className="w-full rounded-2xl border border-white/10 bg-[#080b13] p-6 text-left transition-colors duration-300 hover:border-white/20">
                {body}
            </div>
        );
    }

    return (
        <StarBorder
            as="div"
            color="#60a5fa"
            trailColor="#2563eb"
            borderColor="rgba(96,165,250,0.35)"
            duration={6}
            thickness={1}
            radius={16}
            trailLength={0.34}
            glow={0.65}
            sparkle
            stars={1}
            hover="none"
            clickPulse={false}
            theme="dark"
            backgroundColor="linear-gradient(180deg, rgba(59,130,246,0.20) 0%, rgba(99,102,241,0.08) 45%, #080b13 100%)"
            className="w-full text-left"
            style={{ display: 'block', padding: '24px' }}
        >
            {body}
        </StarBorder>
    );
}

function TableCell({ value, highlight }: { value: Cell; highlight?: boolean }) {
    if (value === true) {
        return (
            <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-blue-500/15">
                <LuCheck className="h-3.5 w-3.5 text-blue-300" />
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-white/5">
                <LuMinus className="h-3.5 w-3.5 text-white/25" />
            </span>
        );
    }
    return <span className={highlight ? 'text-[13px] text-blue-200' : 'text-[13px] text-white/65'}>{value}</span>;
}

export default function Prices() {
    const [yearly, setYearly] = useState(false);

    return (
        <section id="prices" className="relative overflow-hidden bg-[#05070f] px-5 py-24 sm:py-28">
            <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

            <div className="relative mx-auto max-w-6xl">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                        <LuStar className="h-3.5 w-3.5 text-blue-300" />
                        Dipercaya 50+ bisnis
                    </span>
                    <h2 className="mt-6 text-[3rem] font-bold uppercase leading-[0.95] tracking-tight text-white">
                        Sistem Simpel
                        <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Harga Jelas
                        </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
                        Pilih paket sesuai kebutuhan. Tanpa biaya tersembunyi, semua fitur bisa disesuaikan.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="mx-auto mt-8 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm">
                    <button
                        type="button"
                        onClick={() => setYearly(false)}
                        className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${!yearly ? 'bg-blue-600 text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.8)]' : 'text-white/50 hover:text-white'
                            }`}
                    >
                        Bulanan
                    </button>
                    <button
                        type="button"
                        onClick={() => setYearly(true)}
                        className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition-colors ${yearly ? 'bg-blue-600 text-white shadow-[0_0_20px_-4px_rgba(59,130,246,0.8)]' : 'text-white/50 hover:text-white'
                            }`}
                    >
                        Tahunan
                        <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                            -17%
                        </span>
                    </button>
                </div>

                {/* Plan cards */}
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {plans.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} yearly={yearly} />
                    ))}
                </div>

                {/* Full feature comparison */}
                <div className="mt-20">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-white sm:text-2xl">Perbandingan Fitur Lengkap</h3>
                        <p className="mt-2 text-sm text-white/45">Detail semua yang kamu dapatkan di setiap paket.</p>
                    </div>

                    <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#080b13]">
                        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.03]">
                                    <th className="px-5 py-4 font-medium text-white/50">Fitur</th>
                                    <th className="px-5 py-4 font-semibold text-white">Starter</th>
                                    <th className="px-5 py-4 font-semibold text-blue-300">Bisnis</th>
                                    <th className="px-5 py-4 font-semibold text-white">Enterprise</th>
                                </tr>
                            </thead>
                            {comparison.map((group) => (
                                <tbody key={group.group}>
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="bg-white/[0.02] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                                        >
                                            {group.group}
                                        </td>
                                    </tr>
                                    {group.rows.map((row) => (
                                        <tr key={row.label} className="border-t border-white/5">
                                            <td className="px-5 py-3.5 text-white/60">{row.label}</td>
                                            {row.values.map((value, index) => (
                                                <td key={index} className="px-5 py-3.5">
                                                    <TableCell value={value} highlight={index === 1} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            ))}
                        </table>
                    </div>

                    <p className="mt-8 text-center text-xs text-white/35">
                        Butuh kebutuhan khusus?{' '}
                        <Link to="/contact" className="text-blue-300 transition-colors hover:text-blue-200 hover:underline">
                            Hubungi kami
                        </Link>{' '}
                        untuk penawaran custom.
                    </p>
                </div>
            </div>
        </section>
    );
}
