import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Search, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import SchemeCard from '../components/schemes/SchemeCard.jsx';

const categories = ['All', 'Education', 'Health', 'Housing', 'Agriculture', 'Business', 'Women & Family', 'Pension', 'Energy', 'Savings', 'Insurance'];

// Search and category state belongs to this page, not the global app context.
export default function SchemesPage() {
  const { schemes, t } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [targetGroup, setTargetGroup] = useState('All');
  const [residence, setResidence] = useState('All');
  const [benefitType, setBenefitType] = useState('All');
  const targetGroups = useMemo(() => [...new Set(schemes.flatMap((scheme) => scheme.targetGroups || scheme.audience || []))].sort(), [schemes]);
  const residenceTypes = useMemo(() => [...new Set(schemes.flatMap((scheme) => scheme.residence || []))].sort(), [schemes]);
  const benefitTypes = useMemo(() => [...new Set(schemes.map((scheme) => scheme.benefitType).filter(Boolean))].sort(), [schemes]);

  const filteredSchemes = useMemo(() => schemes.filter((scheme) => {
    const searchableText = [scheme.name, scheme.summary, scheme.category, scheme.ministry, scheme.benefitType, ...(scheme.tags || []), ...(scheme.targetGroups || scheme.audience || []), ...(scheme.eligibility || [])].join(' ').toLowerCase();
    const groups = scheme.targetGroups || scheme.audience || [];
    return searchableText.includes(query.trim().toLowerCase())
      && (category === 'All' || scheme.category === category)
      && (targetGroup === 'All' || groups.includes(targetGroup))
      && (residence === 'All' || (scheme.residence || []).includes(residence))
      && (benefitType === 'All' || scheme.benefitType === benefitType);
  }), [schemes, query, category, targetGroup, residence, benefitType]);

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setTargetGroup('All');
    setResidence('All');
    setBenefitType('All');
  };

  return (
    <section className="content-section route-section">
      <div className="section-heading">
        <div><div className="section-eyebrow">{t.madeForNeeds}</div><h2>{t.schemes}</h2><p>{t.schemesSub}</p></div>
        <span className="section-chip">{filteredSchemes.length} {t.schemeCountLabel}</span>
      </div>

      <div className="scheme-filter-panel">
        <div className="scheme-filter-heading">
          <div>
            <span className="scheme-filter-eyebrow">PERSONALISED DISCOVERY</span>
            <h3>Find schemes that fit you</h3>
            <p>Search by need or narrow the list using the filters below.</p>
          </div>
          <button type="button" className="scheme-filter-reset" onClick={resetFilters} disabled={!query && category === 'All' && targetGroup === 'All' && residence === 'All' && benefitType === 'All'}>
            <X size={14} /> Clear filters
          </button>
        </div>

        <label className="search-box scheme-search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search schemes, benefits, eligibility or documents..." />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
        </label>

        <div className="scheme-filter-grid">
          <label className="scheme-filter-field">
            <span>Scheme category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item === 'All' ? 'All categories' : (t.categories?.[item] || item)}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
          <label className="scheme-filter-field">
            <span>Who is it for?</span>
            <select value={targetGroup} onChange={(event) => setTargetGroup(event.target.value)}>
              <option value="All">All beneficiaries</option>
              {targetGroups.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
          <label className="scheme-filter-field">
            <span>Area of residence</span>
            <select value={residence} onChange={(event) => setResidence(event.target.value)}>
              <option value="All">Rural or urban</option>
              {residenceTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
          <label className="scheme-filter-field">
            <span>Type of benefit</span>
            <select value={benefitType} onChange={(event) => setBenefitType(event.target.value)}>
              <option value="All">All benefit types</option>
              {benefitTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
        </div>
        <div className="scheme-filter-results">
          <span><strong>{filteredSchemes.length}</strong> schemes found</span>
          <span>Use more than one filter to narrow your results.</span>
        </div>
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
