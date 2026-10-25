import { Bell, ShieldCheck, CheckCircle2, ExternalLink, GraduationCap, BookOpenCheck, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const availableTopics = ['Education', 'Health', 'Housing', 'Agriculture', 'Business'];

const studentSchemeAlerts = [
  {
    id: 'pm-usp-csss',
    name: 'PM-USP Central Sector Scholarship Scheme',
    description: 'Review the merit, income and course requirements for this central scholarship.',
    url: 'https://scholarships.gov.in/',
    icon: GraduationCap
  },
  {
    id: 'nsp-scholarships',
    name: 'National Scholarship Portal — matching scholarships',
    description: 'Check central and state scholarship listings that may match your student profile.',
    url: 'https://scholarships.gov.in/',
    icon: BookOpenCheck
  },
  {
    id: 'state-post-matric',
    name: 'State Post-Matric Scholarship',
    description: 'Check your state’s current notice and the applicable course, income and category criteria.',
    url: 'https://scholarships.gov.in/',
    icon: FileText
  }
];

// Signed-in users see scholarship opportunities; signed-out users can submit email/topic preferences. Neither flow sends automated notifications.
export default function AlertsPage() {
  const { t, user, email, setEmail, topics, setTopics, subscribe, alertMessage } = useApp();

  const toggleTopic = (topic, checked) => {
    setTopics((current) => checked ? [...current, topic] : current.filter((item) => item !== topic));
  };

  return (
    <section className="alerts-section route-section alerts-page">
      <div className="alerts-art"><div className="alert-ring ring-one" /><div className="alert-ring ring-two" /><div className="alert-bell"><Bell size={32} /><span /></div><div className="alert-star">✦</div></div>
      <div className="alerts-content">
        <span className="section-eyebrow">{t.yourPreferences}</span><h2>{t.alerts}</h2><p>{t.alertsSub}</p>

        {user ? (
          <section className="scheme-alerts-panel" aria-labelledby="scheme-alerts-title">
            <div className="scheme-alerts-heading">
              <div>
                <span className="section-eyebrow">{t.personalizedFor} {user.username.toUpperCase()}</span>
                <h3 id="scheme-alerts-title">{t.scholarshipAlerts}</h3>
                <p>{t.alertsAddedNote}</p>
              </div>
              <span className="scheme-alerts-count">{t.threeAlerts}</span>
            </div>
            <div className="scheme-alert-list">
              {studentSchemeAlerts.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="scheme-alert-item" key={item.id}>
                    <div className="scheme-alert-icon"><Icon size={19} /></div>
                    <div className="scheme-alert-copy">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <a href={item.url} target="_blank" rel="noreferrer">{t.viewOfficialPortal} <ExternalLink size={13} /></a>
                    </div>
                    <span className="scheme-alert-status"><CheckCircle2 size={14} /> {t.alertAdded}</span>
                  </article>
                );
              })}
            </div>
            <p className="scheme-alert-note"><ShieldCheck size={14} /> These are potential matches, not confirmation of eligibility. Verify the current official criteria before applying.</p>
          </section>
        ) : (
          <>
            <p className="scheme-alert-signin">{t.signInForAlerts}</p>
            <form onSubmit={subscribe} className="alerts-form">
              <label className="sr-only" htmlFor="alert-email">{t.email}</label>
              <input id="alert-email" type="email" required placeholder={t.email} value={email} onChange={(event) => setEmail(event.target.value)} />
              <button type="submit" className="btn-primary">{t.subscribe}</button>
            </form>
            <div className="topic-picker"><span>{t.allTopics}</span>
              {availableTopics.map((topic) => (
                <label key={topic} className={topics.includes(topic) ? 'topic-active' : ''}>
                  <input type="checkbox" checked={topics.includes(topic)} onChange={(event) => toggleTopic(topic, event.target.checked)} />{topic}
                </label>
              ))}
            </div>
            {alertMessage && <p className="alert-feedback" role="status">{alertMessage}</p>}
            <p className="alert-disclaimer"><ShieldCheck size={13} /> {t.changeTopicsAnytime}</p>
          </>
        )}
      </div>
    </section>
  );
}
