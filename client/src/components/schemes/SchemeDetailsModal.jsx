import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink, FileText, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

// This modal lives in the shared layout so it can be opened from any scheme list.
export default function SchemeDetailsModal() {
  const navigate = useNavigate();
  const { selectedScheme, setSelectedScheme, startCheck, t } = useApp();

  // Support closing the dialog with Escape and restore the page's normal keyboard flow.
  useEffect(() => {
    if (!selectedScheme) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedScheme(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedScheme, setSelectedScheme]);

  if (!selectedScheme) return null;

  const handleEligibilityClick = () => {
    startCheck(selectedScheme);
    navigate('/eligibility');
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setSelectedScheme(null);
      }}
    >
      <section className="scheme-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={() => setSelectedScheme(null)} aria-label={t.close}>
          <X size={19} />
        </button>
        <span className="category-pill">{t.categories?.[selectedScheme.category] || selectedScheme.category}</span>
        <h2 id="modal-title">{selectedScheme.name}</h2>
        <p>{selectedScheme.summary}</p>
        <div className="modal-benefit"><Sparkles size={17} /><span>{selectedScheme.benefits}</span></div>

        <h3>{t.requirements}</h3>
        <ul>{(selectedScheme.eligibility || []).map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>{t.docs}</h3>
        <ul>{(selectedScheme.documents || []).map((item) => <li key={item}>{item}</li>)}</ul>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleEligibilityClick}>
            {t.checkNow} <ArrowRight size={16} />
          </button>
          <a href={selectedScheme.officialUrl} target="_blank" rel="noreferrer" className="btn-secondary">
            {t.official} <ExternalLink size={15} />
          </a>
        </div>
        <p className="modal-disclaimer"><ShieldCheck size={14} />{t.disclaimer}</p>
      </section>
    </div>
  );
}
