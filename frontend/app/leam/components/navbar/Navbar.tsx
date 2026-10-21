import type { CSSProperties } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LuFolder, LuHouse, LuMail, LuUsers } from 'react-icons/lu';
import Dock, { type DockItemData } from './Dock';

const dockStyle = {
  bottom: 'max(12px, env(safe-area-inset-bottom))',
  '--dock-panel': 'rgba(10, 15, 26, 0.66)',
  '--dock-panel-edge': 'rgba(255, 255, 255, 0.1)',
  '--dock-panel-highlight': 'rgba(255, 255, 255, 0.08)',
  '--dock-tile': 'linear-gradient(180deg, #141b28 0%, #0a0f18 100%)',
  '--dock-tile-edge': 'rgba(255, 255, 255, 0.08)',
  '--dock-tile-highlight': 'rgba(255, 255, 255, 0.12)',
  '--dock-dot': 'rgba(96, 165, 250, 0.9)',
  '--dock-separator': 'rgba(255, 255, 255, 0.14)',
} as CSSProperties;

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items: DockItemData[] = [
    {
      icon: <LuHouse className={pathname === '/' ? 'text-blue-300' : undefined} />,
      label: 'Home',
      active: pathname === '/',
      onClick: () => navigate('/'),
    },
    {
      icon: <LuFolder className={pathname === '/project' ? 'text-blue-300' : undefined} />,
      label: 'Project',
      active: pathname === '/project',
      onClick: () => navigate('/project'),
    },
    {
      icon: <LuUsers className={pathname === '/team' ? 'text-blue-300' : undefined} />,
      label: 'Team',
      active: pathname === '/team',
      onClick: () => navigate('/team'),
    },
    { separator: true },
    {
      icon: <LuMail className={pathname === '/contact' ? 'text-blue-300' : undefined} />,
      label: 'Contact',
      active: pathname === '/contact',
      onClick: () => navigate('/contact'),
    },
  ];

  return (
    <header
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-0 select-none antialiased [-webkit-tap-highlight-color:transparent]"
      data-purpose="site-navigation"
    >
      <Dock
        items={items}
        className="pointer-events-auto"
        theme="dark"
        baseItemSize={46}
        magnification={62}
        panelHeight={58}
        gap={8}
        distance={140}
        accentColor="#3b82f6"
        style={dockStyle}
      />
    </header>
  );
}

/** Bar selalu fixed di bawah, jadi halaman perlu ruang agar konten tidak tertutup. */
export function NavbarSpacer() {
  return <div className="h-20" aria-hidden="true" />;
}
