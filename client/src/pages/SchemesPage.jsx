import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Search, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import SchemeCard from '../components/schemes/SchemeCard.jsx';

const categories = ['All', 'Education', 'Health', 'Housing', 'Agriculture', 'Business', 'Women & Family', 'Pension'];

// Search and category state belongs to this page, not the global app context.
export default function SchemesPage() {
  const { schemes, t } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredSchemes = useMemo(() => schemes.filter((scheme) => {
    const searchableText = [scheme.name, scheme.summary, scheme.category, ...(scheme.tags || [])].join(' ').toLowerCase();
    return searchableText.includes(query.trim().toLowerCase()) && (category === 'All' || scheme.category === category);
  }), [schemes, query, category]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <section className="content-section route-section">
      <div className="section-heading">
        <div><div className="section-eyebrow">{t.madeForNeeds}</div><h2>{t.schemes}</h2><p>{t.schemesSub}</p></div>
        <span className="section-chip">{filteredSchemes.length} {t.schemeCountLabel}</span>
      </div>

      <div className="search-filter-row">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
        </label>
        <label className="filter-select-label">
          <span className="sr-only">{t.filterByCategory}</span>
          <select className="filter-button" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item} value={item}>{item === 'All' ? t.all : (t.categories?.[item] || item)}</option>)}
          </select>
          <ChevronDown size={15} aria-hidden="true" />
        </label>
      </div>

      <div className="category-tabs" role="tablist" aria-label={t.schemeCategories}>
        {categories.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={category === item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>
            {item === 'All' ? t.all : item}
          </button>
        ))}
      </div>

      {filteredSchemes.length ? (
        <div className="scheme-grid">{filteredSchemes.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}</div>
      ) : (
        <div className="empty-state"><Search size={26} /><strong>{t.noResults}</strong><button className="text-button" onClick={resetFilters}>{t.reset}</button></div>
      )}
      <div className="section-footnote"><ShieldCheck size={15} /><span>{t.demoDatasetNote}</span><ArrowRight size={14} /></div>
    </section>
  );
}
