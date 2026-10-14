import { Menu, Globe2, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

const routeLabels = {
  '/': 'navHome',
  '/schemes': 'navSchemes',
  '/eligibility': 'navEligibility',
  '/shorts': 'navShorts',
  '/events': 'navEvents',
  '/alerts': 'navAlerts'
};

// The breadcrumb and language selector stay consistent across all pages.
export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useApp();
  const label = t[routeLabels[pathname]] || 'NagrikOS';

  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Open navigation" onClick={onMenuClick}>
        <Menu size={21} />
      </button>
      <div className="breadcrumbs">
        <span>Workspace</span><span className="crumb-slash">/</span><strong>{label}</strong>
      </div>
      <div className="topbar-actions">
        <label className="language-switch">
          <Globe2 size={16} /><span>{t.language}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t.language}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          <ChevronDown size={13} />
        </label>
        <div className="avatar" aria-label="Citizen profile">S</div>
      </div>
    </header>
  );
}
