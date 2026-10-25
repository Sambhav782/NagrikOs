import { ExternalLink, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

// Keep the government-source disclaimer visible regardless of the current page.
export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="footer">
      <Link className="footer-brand" to="/">
        <span className="brand-mark"><Landmark size={18} /></span>
        <b>nagrik<span>OS</span></b>
      </Link>
      <p>{t.disclaimer}</p>
      <div className="footer-links">
        <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">India.gov.in <ExternalLink size={12} /></a>
        <a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer">myScheme <ExternalLink size={12} /></a>
        <span>{t.footerNote}</span>
      </div>
    </footer>
  );
}
