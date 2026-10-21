'use client';

import { useState } from 'react';
import { Link } from 'react-router';
import { type ComponentPropsWithoutRef } from 'react';

export interface PillNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export interface PillNavProps {
  items?: PillNavItem[];
  activeHref?: string;
  onItemClick?: (item: PillNavItem, index: number) => void;
  linkComponent?: React.ElementType;
  highlightColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_ITEMS: PillNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function PillNav({
  items = DEFAULT_ITEMS,
  activeHref,
  onItemClick,
  linkComponent: LinkComponent = 'a',
  highlightColor = '#f59e0b',
  className = '',
  style,
}: PillNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      className={`pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2 py-2 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)] ${className}`}
      style={style}
      aria-label="Main"
    >
      {items.map((item, index) => {
        const isActive = activeHref === item.href;
        const isHovered = hoveredIndex === index;
        return (
          <LinkComponent
            key={`${item.label}-${index}`}
            href={item.href}
            onClick={() => onItemClick?.(item, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-4 py-2 transition-all duration-300 ease-out active:scale-90 ${
              isActive
                ? 'bg-white/15 text-white'
                : isHovered
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white/80'
            }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.ariaLabel ?? item.label}
          >
            {item.icon && (
              <span
                className={`flex h-6 w-6 items-center justify-center transition-transform duration-300 ease-out ${
                  isHovered ? 'scale-125' : ''
                } ${isActive ? 'text-amber-400' : ''}`}
                style={isActive ? { color: highlightColor } : undefined}
              >
                {item.icon}
              </span>
            )}
            <span className="text-[9px] font-medium leading-none tracking-wide">
              {item.label}
            </span>
            {isActive && (
              <span
                className="absolute -bottom-0.5 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: highlightColor }}
              />
            )}
          </LinkComponent>
        );
      })}
    </nav>
  );
}
