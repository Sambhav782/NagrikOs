import { ArrowUpRight, Bell, CalendarDays, Landmark, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

// Each card points to an official organiser or government announcement.
// Event dates can expire, so users should verify the latest details at the source.
export default function EventsPage() {
  const { events, t } = useApp();
  const icons = [MapPin, Bell, Landmark];

  return (
    <section className="content-section route-section events-section">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">{t.buildLearnParticipate}</div>
          <h2>{t.events}</h2>
          <p>{t.eventsSub}</p>
        </div>
        <a className="section-link" href="https://event.data.gov.in/" target="_blank" rel="noreferrer">
          {t.governmentEvents} <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="events-grid">
        {events.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article className="event-card" key={item.id}>
              <div className={`event-icon event-${index}`}><Icon size={21} /></div>
              <div className="event-type">{item.category}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="event-organizer">{item.organizer}</div>
              <div className="event-location"><MapPin size={13} />{item.location}</div>
              <div className="event-date"><CalendarDays size={14} />{item.dateLabel}</div>
              <a href={item.officialUrl} target="_blank" rel="noreferrer" className="event-link">{t.checkOfficialDetails} <ArrowUpRight size={15} /></a>
            </article>
          );
        })}
      </div>
      {!events.length && <div className="empty-state"><Landmark size={25} /><strong>{t.noEvents}</strong></div>}
    </section>
  );
}
