import { NavLink } from 'react-router-dom';
import {
  ArrowUpRight, Bell, CalendarDays, CircleHelp, Home, Landmark,
  PlayCircle, ShieldCheck, ClipboardCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

const navigation = [
  { to: '/', key: 'navHome', icon: Home, end: true },
  { to: '/schemes', key: 'navSchemes', icon: Landmark },
  { to: '/eligibility', key: 'navEligibility', icon: ClipboardCheck },
  { to: '/shorts', key: 'navShorts', icon: PlayCircle },
  { to: '/events', key: 'navEvents', icon: CalendarDays },
  { to: '/alerts', key: 'navAlerts', icon: Bell }
];

// Shared navigation is rendered once and reused on every route.
export default function Sidebar({ open, onNavigate }) {
  const { t, schemes } = useApp();

  return (
    <>
      {open && <button className="sidebar-scrim" aria-label={t.closeNavigation} onClick={onNavigate} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <NavLink className="brand" to="/" onClick={onNavigate}>
          <span className="brand-mark"><Landmark size={24} strokeWidth={2.2} /></span>
          <span className="brand-word">nagrik<span>OS</span><small>{t.brandSubtitle}</small></span>
        </NavLink>

        <div className="side-label">{t.workspace}</div>
        <nav className="side-nav" aria-label={t.mainNavigation}>
          {navigation.map(({ to, key, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <Icon size={18} />
              {t[key]}
              {to === '/schemes' && <span className="nav-count">{schemes.length}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><ShieldCheck size={18} /></div>
            <strong>{t.safetyTitle}</strong>
            <p>{t.safetyCopy}</p>
            <a href="https://www.cybercrime.gov.in/" target="_blank" rel="noreferrer">
              {t.safetyResources} <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="sidebar-footer">
            <span className="online-dot" />
            <span>{t.citizenFirst}</span>
            <CircleHelp size={15} />
          </div>
        </div>
      </aside>
    </>
  );
}
