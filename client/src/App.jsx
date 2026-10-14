import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import SchemesPage from './pages/SchemesPage.jsx';
import EligibilityPage from './pages/EligibilityPage.jsx';
import ShortsPage from './pages/ShortsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import AlertsPage from './pages/AlertsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Keep route definitions in one place; each page now owns only its own screen.
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="schemes" element={<SchemesPage />} />
            <Route path="eligibility" element={<EligibilityPage />} />
            <Route path="shorts" element={<ShortsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
