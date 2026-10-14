import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, GraduationCap, HeartPulse,
  Home, Landmark, Leaf, Sparkles, Users, WalletCards
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

const categoryIcons = {
  Education: GraduationCap,
  Health: HeartPulse,
  Housing: Home,
  Agriculture: Leaf,
  Business: BriefcaseBusiness,
  'Women & Family': Users,
  Pension: WalletCards
};

// A single card component keeps scheme previews visually consistent across pages.
export default function SchemeCard({ scheme }) {
  const navigate = useNavigate();
  const { t, setSelectedScheme, startCheck } = useApp();
  const Icon = categoryIcons[scheme.category] || Landmark;
  const iconClass = scheme.category.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <article className="scheme-card">
      <div className="scheme-card-top">
        <div className={`category-icon icon-${iconClass}`}><Icon size={21} /></div>
        <span className="category-pill">{scheme.category}</span>
      </div>
      <h3>{scheme.name}</h3>
      <p>{scheme.summary}</p>
      <div className="benefit-line"><Sparkles size={15} /><span>{scheme.benefits}</span></div>
      <div className="card-actions">
        <button className="text-button" onClick={() => setSelectedScheme(scheme)}>
          {t.read} <ArrowRight size={15} />
        </button>
        <button className="mini-arrow" aria-label={t.checkNow} onClick={() => { startCheck(scheme); navigate('/eligibility'); }}>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
}
