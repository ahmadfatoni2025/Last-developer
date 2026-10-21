import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LuMenu, LuX } from 'react-icons/lu';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Fitur', href: '#features' },
    { label: 'Template', href: '#templates' },
    { label: 'Harga', href: '#prices' },
    { label: 'Tentang Kami', href: '#team' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_28px_rgba(99,102,241,0.7)] transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span className="text-base font-semibold tracking-tight text-white">Leam</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-white/55 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/contact"
            className="text-[13px] font-medium text-white/55 transition-colors hover:text-white"
          >
            Hubungi Kami
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-95"
          >
            Mulai Gratis
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          id="navbar-mobile-toggle"
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-white/60 hover:text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-black/90 backdrop-blur-xl border-b border-white/10`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/[0.06] hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 w-full rounded-full bg-white py-2.5 text-center text-sm font-semibold text-black"
          >
            Mulai Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
