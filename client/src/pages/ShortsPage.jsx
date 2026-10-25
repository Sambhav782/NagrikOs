import { ArrowRight, ArrowUpRight, BookOpen, Clock3, FileCheck2, PlayCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

// These are short official-resource explainers, not embedded videos.
export default function ShortsPage() {
  const { updates, t } = useApp();
  const icons = [BookOpen, FileCheck2, ShieldCheck];

  return (
    <section className="content-section route-section shorts-section">
      <div className="section-heading"><div><div className="section-eyebrow">{t.informationNotNoise}</div><h2>{t.shorts}</h2><p>{t.shortsSub}</p></div><span className="section-chip"><PlayCircle size={15} /> {t.quickReads}</span></div>
      <div className="shorts-grid">
        {updates.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article className={`short-card short-${index}`} key={item.id}>
              <div className="short-visual"><span className="short-number">{String(index + 1).padStart(2, '0')}</span><Icon size={39} /><span className="short-play"><ArrowUpRight size={18} /></span></div>
              <div className="short-body">
                <div className="short-meta"><span>{item.type}</span><span><Clock3 size={13} />{item.readTime}</span></div>
                <h3>{item.title}</h3><p>{item.description}</p>
                <a href={item.officialUrl} target="_blank" rel="noreferrer" className="text-button">{t.read}<ArrowRight size={15} /></a>
              </div>
            </article>
          );
        })}
      </div>
      {!updates.length && <div className="empty-state"><BookOpen size={25} /><strong>{t.noExplainers}</strong></div>}
    </section>
  );
}
