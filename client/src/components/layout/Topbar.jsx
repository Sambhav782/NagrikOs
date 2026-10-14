import { useState } from 'react';
import { Menu, Globe2, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import DemoLoginModal from './DemoLoginModal.jsx';

const routeLabels = {
  '/': 'navHome',
  '/schemes': 'navSchemes',
  '/eligibility': 'navEligibility',
  '/shorts': 'navShorts',
  '/events': 'navEvents',
  '/alerts': 'navAlerts'
};

// The topbar owns the sign-in dialog while shared session state lives in AppContext.
export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const { language, setLanguage, t, user, logoutDemo } = useApp();
  const [loginOpen, setLoginOpen] = useState(false);
  const label = t[routeLabels[pathname]] || 'NagrikOS';

  return (
    <>
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
          {user ? (
            <div className="signed-in-actions">
              <span className="signed-in-name"><span className="avatar">{user.username.charAt(0).toUpperCase()}</span><span>{user.username}</span></span>
              <button className="auth-button sign-out-button" onClick={logoutDemo}><LogOut size={14} /><span>Sign out</span></button>
            </div>
          ) : (
            <button className="auth-button sign-in-button" onClick={() => setLoginOpen(true)}><LogIn size={15} /> Sign in</button>
          )}
        </div>
      </header>
      {loginOpen && <DemoLoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}
