import { ArrowRight, ArrowUpRight, BookOpen, Clock3, FileCheck2, PlayCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function ShortsPage() {
  const { updates, t } = useApp();
  const icons = [BookOpen, FileCheck2, ShieldCheck];

  return (
    <section className="content-section route-section shorts-section">
      <div className="section-heading"><div><div className="section-eyebrow">{t.informationNotNoise}</div><h2>{t.shorts}</h2><p>{t.shortsSub}</p></div><span className="section-chip"><PlayCircle size={15} /> {t.quickReads}</span></div>
      <div className="event-source-note"><strong>Curated demo news</strong><span>Summaries are written in advance for this prototype. Each article links to an official government source; dates and availability should be verified there.</span></div>
      <div className="shorts-grid">
        {updates.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article className={`short-card short-${index % 3}`} key={item.id}>
              <Link className="news-card-open" to={`/news/${item.id}`} aria-label={`Read ${item.title}`}><div className="short-visual"><span className="short-number">{String(index + 1).padStart(2, '0')}</span><Icon size={39} /><span className="short-play"><ArrowUpRight size={18} /></span></div></Link>
              <div className="short-body">
                <div className="short-meta"><span>{item.category || item.type}</span><span><Clock3 size={13} />{item.readTime}</span></div>
                <h3><Link className="news-title-link" to={`/news/${item.id}`}>{item.title}</Link></h3>
                <p>{item.summary || item.description}</p>
                <div className="news-card-footer"><Link to={`/news/${item.id}`} className="text-button">{t.read}<ArrowRight size={15} /></Link><a href={item.officialUrl} target="_blank" rel="noreferrer" className="news-source-link">Official source <ArrowUpRight size={13} /></a></div>
              </div>
            </article>
          );
        })}
      </div>
      {!updates.length && <div className="empty-state"><BookOpen size={25} /><strong>{t.noExplainers}</strong></div>}
    </section>
  );
}
