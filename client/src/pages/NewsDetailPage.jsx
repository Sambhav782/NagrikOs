import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays, ExternalLink, Languages, LoaderCircle, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const API_BASE = (import.meta.env.VITE_API_BASE || (import.meta.env.PROD ? 'https://nagrikos-oq90.onrender.com/api' : '/api')).replace(/\/$/, '');
const labels = {
  en: { back:'Back to news', summary:'Summary', fullStory:'Full story', published:'Published', ministry:'Source department', officialSource:'Read official source', translationLoading:'Translating this article into Hindi…', translationUnavailable:'Hindi translation is unavailable right now. Showing the original English article.', machineTranslation:'Machine-translated for convenience. Verify important details with the official source.', loading:'Loading article…', notFound:'Article not found', sourceNote:'This is curated demo content, not a live news feed.' },
  hi: { back:'समाचार पर वापस जाएँ', summary:'सारांश', fullStory:'पूरी खबर', published:'प्रकाशित', ministry:'संबंधित विभाग', officialSource:'आधिकारिक स्रोत पढ़ें', translationLoading:'इस लेख का हिंदी में अनुवाद हो रहा है…', translationUnavailable:'अभी हिंदी अनुवाद उपलब्ध नहीं है। मूल अंग्रेज़ी लेख दिखाया जा रहा है।', machineTranslation:'यह मशीन द्वारा किया गया अनुवाद है। महत्वपूर्ण जानकारी आधिकारिक स्रोत से सत्यापित करें।', loading:'लेख लोड हो रहा है…', notFound:'लेख नहीं मिला', sourceNote:'यह नमूना सामग्री है, लाइव समाचार फ़ीड नहीं।' }
};

export default function NewsDetailPage() {
  const { id } = useParams();
  const { updates, language } = useApp();
  const article = useMemo(() => updates.find((item) => item.id === id), [updates, id]);
  const [translated, setTranslated] = useState(null);
  const [translationStatus, setTranslationStatus] = useState('idle');
  const copy = labels[language] || labels.en;

  useEffect(() => {
    setTranslated(null);
    if (!article || language !== 'hi') { setTranslationStatus('idle'); return undefined; }
    const controller = new AbortController();
    setTranslationStatus('loading');
    fetch(`${API_BASE}/translate/news/${encodeURIComponent(article.id)}`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({targetLanguage:'hi'}), signal:controller.signal
    })
      .then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.error || 'Translation unavailable'); return payload.data; })
      .then((data) => { setTranslated(data); setTranslationStatus('ready'); })
      .catch((error) => { if (error.name !== 'AbortError') setTranslationStatus('unavailable'); });
    return () => controller.abort();
  }, [article, language]);

  if (!article) return <section className="content-section route-section news-detail"><Link className="news-back-link" to="/shorts"><ArrowLeft size={16} />{copy.back}</Link><div className="empty-state"><BookOpen size={25} /><strong>{updates.length ? copy.notFound : copy.loading}</strong></div></section>;

  const content = language === 'hi' && translated ? translated : article;
  return (
    <article className="content-section route-section news-detail">
      <Link className="news-back-link" to="/shorts"><ArrowLeft size={16} />{copy.back}</Link>
      <header className="news-detail-header">
        <div className="section-eyebrow">{content.category || article.category}</div>
        <h1>{content.title || article.title}</h1>
        <div className="news-detail-meta"><span><CalendarDays size={14} />{copy.published}: {content.publishedAt || article.publishedAt}</span><span>{copy.ministry}: {content.ministry || article.ministry}</span></div>
      </header>
      {language === 'hi' && translationStatus === 'loading' && <div className="translation-notice"><LoaderCircle size={16} className="translation-spinner" />{copy.translationLoading}</div>}
      {language === 'hi' && translationStatus === 'unavailable' && <div className="translation-notice translation-warning"><Languages size={16} />{copy.translationUnavailable}</div>}
      {language === 'hi' && translationStatus === 'ready' && <div className="translation-notice"><Languages size={16} />{copy.machineTranslation}</div>}
      <section className="news-summary-panel"><div className="news-panel-heading"><BookOpen size={17} /><h2>{copy.summary}</h2></div><p>{content.summary || content.description || article.summary}</p></section>
      <section className="news-full-story"><h2>{copy.fullStory}</h2>{(content.fullContent || article.fullContent || article.description).split('\n\n').map((paragraph,index)=><p key={index}>{paragraph}</p>)}</section>
      <div className="news-official-source"><div><ShieldCheck size={18} /><span>Always verify dates, eligibility, and instructions with the official source.</span></div><a href={article.officialUrl} target="_blank" rel="noreferrer" className="btn-primary">{copy.officialSource}<ExternalLink size={15} /></a></div>
      <p className="news-detail-disclaimer">{copy.sourceNote}</p>
    </article>
  );
}
