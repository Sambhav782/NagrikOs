import { Check, CircleHelp, ClipboardCheck, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

// Eligibility inputs and results are kept in shared context so scheme cards can preselect a scheme.
export default function EligibilityPage() {
  const { schemes, t, form, setForm, runEligibility, eligibility, setEligibility } = useApp();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setEligibility(null);
  };

  return (
    <section className="content-section route-section eligibility-section">
      <div className="section-heading">
        <div><div className="section-eyebrow">PERSONALISED GUIDANCE</div><h2>{t.eligibility}</h2><p>Answer only what you are comfortable sharing. This demo does not save your answers.</p></div>
        <span className="private-note"><ShieldCheck size={15} /> Not stored</span>
      </div>

      <form className="eligibility-form" onSubmit={runEligibility}>
        <label className="field full-field"><span>{t.selectScheme}</span>
          <select required value={form.schemeId} onChange={(event) => updateField('schemeId', event.target.value)}>
            <option value="">Select a scheme to review...</option>
            {schemes.map((scheme) => <option key={scheme.id} value={scheme.id}>{scheme.name}</option>)}
          </select>
        </label>
        <label className="field"><span>{t.age}</span><input type="number" min="0" max="120" value={form.age} onChange={(event) => updateField('age', event.target.value)} /></label>
        <label className="field"><span>{t.state}</span><input placeholder="e.g. Uttar Pradesh" value={form.state} onChange={(event) => updateField('state', event.target.value)} /></label>
        <label className="field"><span>{t.occupation}</span>
          <select value={form.occupation} onChange={(event) => updateField('occupation', event.target.value)}>
            <option value="student">Student</option><option value="farmer">Farmer</option><option value="employed">Employed</option><option value="self-employed">Self-employed</option><option value="unemployed">Not currently employed</option><option value="other">Other</option>
          </select>
        </label>
        <label className="field"><span>{t.income}</span><input type="number" min="0" placeholder="Optional" value={form.annualIncome} onChange={(event) => updateField('annualIncome', event.target.value)} /></label>
        <label className="field"><span>{t.home}</span>
          <select value={form.ownsHome} onChange={(event) => updateField('ownsHome', event.target.value)}><option value="no">No / not sure</option><option value="yes">Yes</option></select>
        </label>
        <label className="field"><span>{t.student}</span>
          <select value={form.isStudent ? 'yes' : 'no'} onChange={(event) => updateField('isStudent', event.target.value === 'yes')}><option value="yes">Yes</option><option value="no">No</option></select>
        </label>
        <div className="form-submit-row"><p><ShieldCheck size={15} /> Your answers are used only to generate guidance in this demo.</p><button className="btn-primary" type="submit">{t.runCheck}<ClipboardCheck size={16} /></button></div>
      </form>

      {eligibility && (
        <div className="guidance-result" aria-live="polite">
          {eligibility.error ? <p className="error-text">{eligibility.error}</p> : (
            <>
              <div className="result-heading"><div className="result-check"><ClipboardCheck size={20} /></div><div><span className="section-eyebrow">PRELIMINARY GUIDANCE</span><h3>{eligibility.scheme.name}</h3></div></div>
              <p>{eligibility.summary}</p>
              <div className="result-columns">
                <div><h4><Check size={16} />{t.requirements}</h4><ul>{(eligibility.checklist || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h4><FileText size={16} />{t.docs}</h4><ul>{(eligibility.documents || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
              <div className="result-notes">{(eligibility.notes || []).map((note) => <p key={note}><CircleHelp size={15} />{note}</p>)}</div>
              <a className="btn-primary inline-btn" href={eligibility.scheme.officialUrl} target="_blank" rel="noreferrer">{t.official}<ExternalLink size={15} /></a>
            </>
          )}
        </div>
      )}
    </section>
  );
}
