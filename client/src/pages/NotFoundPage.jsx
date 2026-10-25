import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

// A dedicated 404 page is more helpful than silently redirecting unknown URLs.
export default function NotFoundPage() {
  const { t } = useApp();

  return (
    <section className="content-section route-section not-found-page">
      <div className="empty-state">
        <Search size={30} />
        <strong>{t.pageNotFound}</strong>
        <p>{t.pageNotFoundDetails}</p>
        <Link className="btn-primary" to="/"><ArrowLeft size={16} />{t.backHome}</Link>
      </div>
    </section>
  );
}
