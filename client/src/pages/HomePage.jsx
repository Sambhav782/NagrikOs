import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check, ClipboardCheck, ExternalLink, FileCheck2, Landmark, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import SchemeCard from '../components/schemes/SchemeCard.jsx';

// The overview page introduces the workflow and previews a few available schemes.
export default function HomePage() {
  const { t, schemes } = useApp();
  const featuredSchemes = schemes.slice(0, 3);

  return (
    <>
      <section className="welcome-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" />{t.welcome}</div>
          <h1>{t.ready}</h1>
          <p className="welcome-copy">{t.intro}</p>
        </div>
        <div className="welcome-illustration" aria-hidden="true">
          <div className="sun-orb" />
          <div className="illustration-building">
            <div className="building-roof" />
            <div className="building-columns"><i /><i /><i /><i /></div>
            <div className="building-base" />
          </div>
          <div className="illustration-leaf leaf-one" /><div className="illustration-leaf leaf-two" />
        </div>
      </section>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-kicker"><Sparkles size={14} />{t.verified}</div>
          <h2>{t.headline}</h2>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/schemes">{t.explore}<ArrowRight size={17} /></Link>
            <a className="btn-ghost" href="#how-it-works">{t.how}<ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-proof"><ShieldCheck size={16} /><span>{t.verifiedSub}</span><span className="proof-separator">•</span><span>Built for every citizen</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-doc">
            <div className="doc-emblem"><Landmark size={26} /></div>
            <div className="doc-line long" /><div className="doc-line" /><div className="doc-line short" />
            <div className="doc-check"><Check size={16} /></div>
          </div>
          <div className="floating-card float-check"><span className="float-icon"><FileCheck2 size={18} /></span><span><b>Eligibility guide</b><small>Step-by-step help</small></span><Check size={17} className="float-success" /></div>
          <div className="floating-card float-verified"><span className="verified-seal"><ShieldCheck size={18} /></span><span><b>Official links</b><small>Trust, not guesswork</small></span></div>
          <div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">✦</div>
        </div>
        <div className="hero-bottom-note"><span className="note-icon"><BookOpen size={15} /></span><span>Learn it. Check it. Apply with confidence.</span><ArrowUpRight size={15} /></div>
      </section>

      <section id="how-it-works" className="steps-strip">
        <div className="step-intro"><span className="step-number">01 — 03</span><strong>One simple path to support</strong><span>From discovery to your next step.</span></div>
        <div className="step"><span className="step-icon step-blue"><Search size={18} /></span><div><b>Discover</b><small>Find relevant schemes</small></div></div>
        <ArrowRight className="step-arrow" size={17} />
        <div className="step"><span className="step-icon step-green"><ClipboardCheck size={18} /></span><div><b>Understand</b><small>Review eligibility & docs</small></div></div>
        <ArrowRight className="step-arrow" size={17} />
        <div className="step"><span className="step-icon step-orange"><ExternalLink size={18} /></span><div><b>Take action</b><small>Visit official portals</small></div></div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><div className="section-eyebrow">MADE FOR YOUR NEEDS</div><h2>{t.schemes}</h2><p>{t.schemesSub}</p></div>
          <Link className="section-link" to="/schemes">{t.viewAll}<ArrowRight size={16} /></Link>
        </div>
        {featuredSchemes.length > 0 ? (
          <div className="scheme-grid">{featuredSchemes.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} />)}</div>
        ) : (
          <div className="empty-state"><Search size={26} /><strong>{t.apiOffline}</strong></div>
        )}
        <div className="section-footnote"><ShieldCheck size={15} /><span>Scheme summaries are for orientation. Confirm rules, benefits and deadlines on the official website.</span></div>
      </section>

      <section className="eligibility-banner">
        <div className="eligibility-art"><div className="elig-circle circle-one" /><div className="elig-circle circle-two" /><div className="elig-paper"><FileCheck2 size={29} /><span /><span /><span /></div><div className="elig-check"><Check size={18} /></div></div>
        <div className="eligibility-copy"><span className="section-eyebrow">YOUR NEXT STEP</span><h2>Not sure where you qualify?</h2><p>Answer a few simple questions to get a preliminary checklist and links to official requirements.</p><Link className="btn-primary" to="/eligibility">{t.check}<ArrowRight size={17} /></Link></div>
        <div className="eligibility-side-note"><ShieldCheck size={18} /><span>Guidance, not a final decision</span></div>
      </section>
    </>
  );
}
