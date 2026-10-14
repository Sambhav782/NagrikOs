import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CircleHelp } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import Footer from './Footer.jsx';
import SchemeDetailsModal from '../schemes/SchemeDetailsModal.jsx';

// The layout provides the persistent shell; Outlet renders the selected route.
export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { apiOffline } = useApp();

  return (
    <div className="app-shell">
      <Sidebar open={mobileMenuOpen} onNavigate={() => setMobileMenuOpen(false)} />
      <main className="main-area">
        <Topbar onMenuClick={() => setMobileMenuOpen((open) => !open)} />
        {apiOffline && (
          <div className="offline-banner" role="status">
            <CircleHelp size={16} /> The API is unavailable. Run the backend from the project root.
          </div>
        )}
        <div className="page-content">
          <Outlet />
          <Footer />
        </div>
      </main>
      <SchemeDetailsModal />
    </div>
  );
}
