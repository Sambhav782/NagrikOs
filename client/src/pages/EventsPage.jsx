import { ArrowUpRight, Bell, CalendarDays, Landmark, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

// Public-service cards always link out to the resource's official destination.
export default function EventsPage() {
  const { events, t } = useApp();
  const icons = [MapPin, Bell, Landmark];

  return (
    <section className="content-section route-section events-section">
      <div className="section-heading"><div><div className="section-eyebrow">CONNECTED TO PUBLIC SERVICES</div><h2>{t.events}</h2><p>{t.eventsSub}</p></div><a className="section-link" href="https://www.india.gov.in/" target="_blank" rel="noreferrer">India.gov.in <ArrowUpRight size={16} /></a></div>
      <div className="events-grid">
        {events.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article className="event-card" key={item.id}>
              <div className={`event-icon event-${index}`}><Icon size={21} /></div>
              <div className="event-type">{item.category}</div>
              <h3>{item.title}</h3><p>{item.description}</p>
              <div className="event-date"><CalendarDays size={14} />{item.dateLabel}</div>
              <a href={item.officialUrl} target="_blank" rel="noreferrer" className="event-link">Open resource <ArrowUpRight size={15} /></a>
            </article>
          );
        })}
      </div>
      {!events.length && <div className="empty-state"><Landmark size={25} /><strong>No resources are available right now.</strong></div>}
    </section>
  );
}
