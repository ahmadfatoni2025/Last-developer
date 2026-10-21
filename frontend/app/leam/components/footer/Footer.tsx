import { Link } from 'react-router';
import { LuHeart } from 'react-icons/lu';

const footerLinks = {
  Produk: [
    { label: 'Fitur', href: '#features' },
    { label: 'Template', href: '#templates' },
    { label: 'Harga', href: '#prices' },
    { label: 'Changelog', href: '#' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '#team' },
    { label: 'Blog', href: '#' },
    { label: 'Karir', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Dukungan: [
    { label: 'Dokumentasi', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Hubungi Kami', href: '/contact' },
    { label: 'Status Sistem', href: '#' },
  ],
  Legal: [
    { label: 'Syarat Layanan', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Cookie', href: '#' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#05070f] px-5 pb-10 pt-16" data-purpose="site-footer">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.4)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="text-base font-semibold text-white">Leam</span>
            </Link>
            <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-white/35">
              Sistem digital yang rapi, cepat, dan mudah dipakai untuk bisnis Indonesia.
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {[
                { label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M2 4a2 2 0 114 0 2 2 0 01-4 0z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-white/40 hover:border-white/15 hover:text-white transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/45 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-white/30">
            © {currentYear} Leam Collective. Hak cipta dilindungi.
          </p>
          <p className="flex items-center gap-1 text-[12px] text-white/20">
            Dibangun dengan <LuHeart className="h-3 w-3 text-red-400/80" /> di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
