import { Bell, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const availableTopics = ['Education', 'Health', 'Housing', 'Agriculture', 'Business'];

// This page validates preferences through the API; it does not send real email alerts.
export default function AlertsPage() {
  const { t, email, setEmail, topics, setTopics, subscribe, alertMessage } = useApp();

  const toggleTopic = (topic, checked) => {
    setTopics((current) => checked ? [...current, topic] : current.filter((item) => item !== topic));
  };

  return (
    <section className="alerts-section route-section alerts-page">
      <div className="alerts-art"><div className="alert-ring ring-one" /><div className="alert-ring ring-two" /><div className="alert-bell"><Bell size={32} /><span /></div><div className="alert-star">✦</div></div>
      <div className="alerts-content">
        <span className="section-eyebrow">YOUR PREFERENCES</span><h2>{t.alerts}</h2><p>{t.alertsSub}</p>
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
        <p className="alert-disclaimer"><Bell size={13} /> Demo only: preferences are validated; email delivery is not configured.</p>
        <p className="alert-disclaimer"><ShieldCheck size={13} /> You can change your selected topics any time.</p>
      </div>
    </section>
  );
}
