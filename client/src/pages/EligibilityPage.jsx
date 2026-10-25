import {
  ArrowRight, BadgeCheck, Check, CircleHelp, ClipboardCheck, ExternalLink,
  FileText, ShieldCheck, XCircle, GraduationCap, BookOpenCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

// Recommendations use the signed-in user's B.Tech-student profile.
// They are possible matches to investigate, not confirmed official eligibility decisions.
const studentRecommendations = [
  {
    id: 'pm-usp-csss',
    name: 'PM-USP Central Sector Scholarship Scheme',
    category: 'Higher education scholarship',
    fit: 'Designed for eligible college and university students. The current notice includes Class XII merit, family-income, regular-course and other conditions.',
    nextStep: 'Check your Class XII percentile, family income and current notification.',
    url: 'https://scholarships.gov.in/',
    icon: GraduationCap
  },
  {
    id: 'nsp-scholarships',
    name: 'National Scholarship Portal — matching scholarships',
    category: 'Central & state scholarships',
    fit: 'A B.Tech student may find central or state scholarships on the portal; eligibility depends on the specific scheme, state, course, income and category criteria.',
    nextStep: 'Use the portal to find scholarships that match your course and personal circumstances.',
    url: 'https://scholarships.gov.in/',
    icon: BookOpenCheck
  },
  {
    id: 'state-post-matric',
    name: 'State Post-Matric Scholarship',
    category: 'Conditional match',
    fit: 'Worth checking if you meet the relevant state, course, family-income and community/category conditions. Availability and criteria differ by state.',
    nextStep: 'Choose your state and check the current official notification before applying.',
    url: 'https://scholarships.gov.in/',
    icon: FileText
  }
];

// Eligibility inputs and results are kept in shared context so scheme cards can preselect a scheme.
export default function EligibilityPage() {
  const { schemes, t, form, setForm, runEligibility, eligibility, setEligibility, user } = useApp();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setEligibility(null);
  };

  const chooseAlternative = (schemeId) => {
    setForm((current) => ({ ...current, schemeId }));
    setEligibility(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resultLabels = {
    eligible: { title: 'Likely eligible', icon: BadgeCheck, className: 'eligible' },
    not_eligible: { title: 'Not eligible based on these answers', icon: XCircle, className: 'not-eligible' },
    needs_verification: { title: 'Needs official verification', icon: CircleHelp, className: 'needs-verification' }
  };

  return (
    <section className="content-section route-section eligibility-section">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">{t.personalizedGuidance}</div>
          <h2>{t.eligibility}</h2>
          <p>{user ? t.studentProfileIntro : t.privacyFormIntro}</p>
        </div>
        <span className="private-note"><ShieldCheck size={15} /> {user ? t.personalProfile : t.notStored}</span>
      </div>

      {user ? (
        <div className="personalized-schemes">
          <div className="personalized-intro">
            <div className="personalized-avatar"><GraduationCap size={22} /></div>
            <div><span className="section-eyebrow">RECOMMENDED FOR {user.username.toUpperCase()}</span><h3>{t.scholarshipsToCheck}</h3><p>{t.studentProfileBasis}</p></div>
          </div>
          <div className="personalized-grid">
            {studentRecommendations.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="personalized-card" key={item.id}>
                  <div className="personalized-card-top"><span className="personalized-number">0{index + 1}</span><span className="category-pill">{item.category}</span></div>
                  <div className="personalized-card-icon"><Icon size={22} /></div>
                  <h3>{item.name}</h3>
                  <p>{item.fit}</p>
                  <div className="personalized-next"><Check size={15} /><span>{item.nextStep}</span></div>
                  <a className="btn-primary personalized-link" href={item.url} target="_blank" rel="noreferrer">{t.checkOfficialCriteria} <ExternalLink size={14} /></a>
                </article>
              );
            })}
          </div>
          <div className="personalized-disclaimer"><CircleHelp size={16} /><p><strong>{t.important}</strong> {t.eligibilityDisclaimer} {t.signOutForFullForm}</p></div>
        </div>
      ) : (
        <>
          <form className="eligibility-form" onSubmit={runEligibility}>
            <label className="field full-field"><span>{t.selectScheme}</span>
              <select required value={form.schemeId} onChange={(event) => updateField('schemeId', event.target.value)}>
                <option value="">{t.selectSchemePrompt}</option>
                {schemes.map((scheme) => <option key={scheme.id} value={scheme.id}>{scheme.name}</option>)}
              </select>
            </label>
            <label className="field"><span>{t.age}</span><input type="number" min="0" max="120" value={form.age} onChange={(event) => updateField('age', event.target.value)} /></label>
            <label className="field"><span>{t.state}</span><input placeholder={t.stateExample} value={form.state} onChange={(event) => updateField('state', event.target.value)} /></label>
            <label className="field"><span>{t.occupation}</span>
              <select value={form.occupation} onChange={(event) => updateField('occupation', event.target.value)}>
                <option value="student">{t.studentOccupation}</option><option value="farmer">{t.farmerOccupation}</option><option value="employed">{t.employedOccupation}</option><option value="self-employed">{t.selfEmployedOccupation}</option><option value="unemployed">{t.unemployedOccupation}</option><option value="other">{t.otherOccupation}</option>
              </select>
            </label>
            <label className="field"><span>{t.income}</span><input type="number" min="0" placeholder={t.optional} value={form.annualIncome} onChange={(event) => updateField('annualIncome', event.target.value)} /></label>
            <label className="field"><span>{t.home}</span>
              <select value={form.ownsHome} onChange={(event) => updateField('ownsHome', event.target.value)}><option value="no">{t.no}</option><option value="yes">{t.yes}</option><option value="unsure">{t.notSure}</option></select>
            </label>
            <label className="field"><span>{t.student}</span>
              <select value={form.isStudent ? 'yes' : 'no'} onChange={(event) => updateField('isStudent', event.target.value === 'yes')}><option value="yes">{t.yes}</option><option value="no">{t.no}</option></select>
            </label>
            <div className="form-submit-row"><p><ShieldCheck size={15} /> {t.answersNotStored}</p><button className="btn-primary" type="submit">{t.runCheck}<ClipboardCheck size={16} /></button></div>
          </form>

          {eligibility && (
            <div className="guidance-result" aria-live="polite">
              {eligibility.error ? <p className="error-text">{eligibility.error}</p> : (() => {
                const status = resultLabels[eligibility.result] || resultLabels.needs_verification;
                const StatusIcon = status.icon;
                return (
                  <>
                    <div className={`eligibility-outcome ${status.className}`}>
                      <div className="outcome-icon"><StatusIcon size={25} /></div>
                      <div>
                        <span className="section-eyebrow">{t.yourResult}</span>
                        <h3>{status.title}</h3>
                        <p>{eligibility.scheme.name}</p>
                      </div>
                    </div>
                    <p className="outcome-summary">{eligibility.summary}</p>

                    {eligibility.result === 'eligible' && (
                      <div className="result-columns">
                        <div><h4><Check size={16} />{t.requirements}</h4><ul>{(eligibility.checklist || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
                        <div><h4><FileText size={16} />{t.docs}</h4><ul>{(eligibility.documents || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
                      </div>
                    )}

                    {eligibility.result === 'not_eligible' && (
                      <div className="alternative-schemes">
                        <h4><ArrowRight size={16} />{t.alternativesTitle}</h4>
                        {eligibility.alternatives?.length ? (
                          <div className="alternative-list">
                            {eligibility.alternatives.map((alternative) => (
                              <article className="alternative-card" key={alternative.id}>
                                <div><span className="category-pill">{alternative.category}</span><h5>{alternative.name}</h5><p>{alternative.reason}</p></div>
                                <button type="button" className="btn-secondary" onClick={() => chooseAlternative(alternative.id)}>{t.checkThisScheme} <ArrowRight size={14} /></button>
                              </article>
                            ))}
                          </div>
                        ) : (
                          <p>{t.noCloseMatch} <Link to="/schemes">{t.schemeDirectory}</Link>.</p>
                        )}
                      </div>
                    )}

                    {eligibility.result === 'needs_verification' && (
                      <div className="verification-next-step">
                        <CircleHelp size={17} />
                        <p>{t.needsOfficialVerification}</p>
                      </div>
                    )}

                    <div className="result-notes">{(eligibility.notes || []).map((note) => <p key={note}><CircleHelp size={15} />{note}</p>)}</div>
                    <a className="btn-primary inline-btn" href={eligibility.scheme.officialUrl} target="_blank" rel="noreferrer">{t.openOfficialSchemePortal} <ExternalLink size={15} /></a>
                  </>
                );
              })()}
            </div>
          )}
        </>
      )}
    </section>
  );
}
