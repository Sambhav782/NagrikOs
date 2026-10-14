import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen, Check, ChevronDown,
  CircleHelp, ClipboardCheck, FileCheck2, FileText, Globe2, HeartPulse, Home,
  Landmark, Leaf, Menu, Search, ShieldCheck, Sparkles, GraduationCap, BriefcaseBusiness,
  Users, X, CalendarDays, PlayCircle, ExternalLink, Clock3, MapPin, WalletCards
} from 'lucide-react';

const API = (import.meta.env.VITE_API_BASE || '/api').replace(/\/$/, '');
const categories = ['All', 'Education', 'Health', 'Housing', 'Agriculture', 'Business', 'Women & Family', 'Pension'];
const categoryIcons = {
  Education: GraduationCap, Health: HeartPulse, Housing: Home, Agriculture: Leaf,
  Business: BriefcaseBusiness, 'Women & Family': Users, Pension: WalletCards
};
const copy = {
  en: {
    tagline: 'Public services, made simpler.', navHome: 'Overview', navSchemes: 'Find schemes',
    navShorts: 'Government shorts', navEvents: 'Events & services', navAlerts: 'My alerts',
    search: 'Search schemes, benefits, or services...', welcome: 'Your gateway to government benefits',
    headline: 'The right support,\nwithout the runaround.', intro: 'Discover schemes, understand eligibility, and get ready to apply — all in one place.',
    explore: 'Explore schemes', how: 'How it works', verified: 'Official-source first', verifiedSub: 'Always verify details before applying',
    schemes: 'Explore schemes', schemesSub: 'Find support that fits your life.', viewAll: 'Browse all schemes',
    all: 'All schemes', check: 'Check my eligibility', popular: 'Popular right now', shorts: 'Government, in a minute',
    shortsSub: 'Short explainers to help you make informed decisions.', events: 'Public services & events',
    eventsSub: 'Useful official resources, all in one place.', alerts: 'Get updates that matter to you',
    alertsSub: 'Choose a language and topics to receive relevant updates when alerts are enabled.',
    email: 'Email address', subscribe: 'Save preferences', disclaimer: 'NagrikOS is an independent information assistant, not a government website. Scheme details can change. Final eligibility is determined by the responsible department.',
    eligibility: 'Eligibility guide', selectScheme: 'Choose a scheme', age: 'Your age', state: 'State / Union Territory',
    occupation: 'Occupation', income: 'Annual household income (₹)', home: 'Do you own a pucca house?',
    student: 'Are you currently a student?', runCheck: 'Review my answers', result: 'Your guidance',
    docs: 'Documents to prepare', requirements: 'What to check', official: 'Open official website',
    close: 'Close', allTopics: 'Choose your interests', language: 'Language', hindi: 'हिन्दी', english: 'English',
    noResults: 'No matching schemes. Try another search or category.', apiOffline: 'API is unavailable. Start the app with npm run dev from the project root.',
    demo: 'DEMO DATA', browse: 'Browse schemes', ready: 'Small steps. Real progress.',
    checkNow: 'Check eligibility', read: 'Read guide', minutes: 'min read', save: 'Save'
  },
  hi: {
    tagline: 'सरकारी सेवाएँ, अब आसान।', navHome: 'होम', navSchemes: 'योजनाएँ खोजें',
    navShorts: 'सरकारी जानकारी', navEvents: 'सेवाएँ और कार्यक्रम', navAlerts: 'मेरे अलर्ट',
    search: 'योजना, लाभ या सेवा खोजें...', welcome: 'सरकारी लाभों तक आपका आसान रास्ता',
    headline: 'सही सहायता,\nबिना परेशानी के।', intro: 'योजनाएँ खोजें, पात्रता समझें और आवेदन की तैयारी करें — एक ही जगह।',
    explore: 'योजनाएँ देखें', how: 'कैसे काम करता है', verified: 'आधिकारिक स्रोत पहले', verifiedSub: 'आवेदन से पहले जानकारी जाँचें',
    schemes: 'योजनाएँ खोजें', schemesSub: 'अपने लिए उपयुक्त सहायता खोजें।', viewAll: 'सभी योजनाएँ देखें',
    all: 'सभी योजनाएँ', check: 'पात्रता जाँचें', popular: 'लोकप्रिय योजनाएँ', shorts: 'एक मिनट में सरकारी जानकारी',
    shortsSub: 'बेहतर निर्णय के लिए छोटे और सरल समझाने वाले वीडियो।', events: 'सार्वजनिक सेवाएँ और कार्यक्रम',
    eventsSub: 'उपयोगी आधिकारिक संसाधन एक जगह।', alerts: 'अपने काम के अपडेट पाएँ',
    alertsSub: 'भाषा और विषय चुनें। अलर्ट सेवा सक्षम होने पर प्रासंगिक अपडेट मिलेंगे।',
    email: 'ईमेल पता', subscribe: 'प्राथमिकताएँ सहेजें', disclaimer: 'NagrikOS एक स्वतंत्र सूचना सहायक है, सरकारी वेबसाइट नहीं। योजनाओं की जानकारी बदल सकती है। अंतिम पात्रता संबंधित विभाग तय करता है।',
    eligibility: 'पात्रता मार्गदर्शिका', selectScheme: 'योजना चुनें', age: 'आपकी उम्र', state: 'राज्य / केंद्र शासित प्रदेश',
    occupation: 'व्यवसाय', income: 'वार्षिक पारिवारिक आय (₹)', home: 'क्या आपके पास पक्का घर है?',
    student: 'क्या आप अभी विद्यार्थी हैं?', runCheck: 'मेरे जवाब देखें', result: 'आपके लिए मार्गदर्शन',
    docs: 'तैयार रखने वाले दस्तावेज़', requirements: 'क्या जाँचें', official: 'आधिकारिक वेबसाइट खोलें',
    close: 'बंद करें', allTopics: 'अपनी रुचियाँ चुनें', language: 'भाषा', hindi: 'हिन्दी', english: 'English',
    noResults: 'कोई योजना नहीं मिली। खोज या श्रेणी बदलें।', apiOffline: 'API उपलब्ध नहीं है। प्रोजेक्ट रूट में npm run dev चलाएँ।',
    demo: 'डेमो डेटा', browse: 'योजनाएँ देखें', ready: 'छोटे कदम। वास्तविक प्रगति।',
    checkNow: 'पात्रता जाँचें', read: 'गाइड पढ़ें', minutes: 'मिनट', save: 'सहेजें'
  }
};

function App() {
  const [language, setLanguage] = useState('en');
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [schemes, setSchemes] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [events, setEvents] = useState([]);
  const [apiOffline, setApiOffline] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [form, setForm] = useState({ schemeId: '', age: '22', state: '', occupation: 'student', annualIncome: '', ownsHome: 'no', isStudent: true });
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState(['Education', 'Health']);
  const [alertMessage, setAlertMessage] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = copy[language];

  useEffect(() => {
    Promise.all([
      fetch(API + '/schemes').then(r => { if (!r.ok) throw new Error('API'); return r.json(); }),
      fetch(API + '/updates').then(r => { if (!r.ok) throw new Error('API'); return r.json(); }),
      fetch(API + '/events').then(r => { if (!r.ok) throw new Error('API'); return r.json(); })
    ]).then(([s, u, e]) => {
      setSchemes(s.data || []); setUpdates(u.data || []); setEvents(e.data || []);
      setApiOffline(false);
    }).catch(() => setApiOffline(true));
  }, []);

  const filteredSchemes = useMemo(() => schemes.filter(s => {
    const text = [s.name, s.summary, s.category, ...(s.tags || [])].join(' ').toLowerCase();
    return text.includes(query.toLowerCase()) && (category === 'All' || s.category === category);
  }), [schemes, query, category]);

  const navigate = (section) => {
    setActive(section); setMobileMenu(false);
    const id = section === 'home' ? 'top' : section;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const runEligibility = async (event) => {
    event.preventDefault();
    setEligibility(null);
    try {
      const response = await fetch(API + '/eligibility/check', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not check your answers.');
      setEligibility(payload);
    } catch (error) { setEligibility({ error: error.message || 'Could not connect to the API.' }); }
  };

  const subscribe = async (event) => {
    event.preventDefault(); setAlertMessage('');
    try {
      const response = await fetch(API + '/alerts/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language, categories: topics })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not save preferences.');
      setAlertMessage(payload.message);
    } catch (error) { setAlertMessage(error.message || 'Could not connect to the API.'); }
  };

  const startCheck = (scheme) => {
    setForm(current => ({ ...current, schemeId: scheme.id }));
    setSelectedScheme(scheme);
    setEligibility(null);
    setActive('eligibility');
    setTimeout(() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  const renderScheme = (scheme) => {
    const Icon = categoryIcons[scheme.category] || Landmark;
    return <article className="scheme-card" key={scheme.id}>
      <div className="scheme-card-top">
        <div className={'category-icon icon-' + scheme.category.toLowerCase().replace(/[^a-z]+/g, '-') }><Icon size={21} /></div>
        <span className="category-pill">{scheme.category}</span>
      </div>
      <h3>{scheme.name}</h3>
      <p>{scheme.summary}</p>
      <div className="benefit-line"><Sparkles size={15} /><span>{scheme.benefits}</span></div>
      <div className="card-actions">
        <button className="text-button" onClick={() => setSelectedScheme(scheme)}>{t.read} <ArrowRight size={15} /></button>
        <button className="mini-arrow" aria-label={t.checkNow} onClick={() => startCheck(scheme)}><ArrowUpRight size={17} /></button>
      </div>
    </article>;
  };

  return <div id="top" className="app-shell">
    <aside className={'sidebar ' + (mobileMenu ? 'sidebar-open' : '')}>
      <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
        <span className="brand-mark"><Landmark size={24} strokeWidth={2.2} /></span>
        <span className="brand-word">nagrik<span>OS</span><small>YOUR CITIZEN COMPANION</small></span>
      </a>
      <div className="side-label">WORKSPACE</div>
      <nav className="side-nav">
        <button className={active === 'home' ? 'active' : ''} onClick={() => navigate('home')}><Home size={18}/>{t.navHome}</button>
        <button className={active === 'schemes' ? 'active' : ''} onClick={() => navigate('schemes')}><Landmark size={18}/>{t.navSchemes}<span className="nav-count">{schemes.length}</span></button>
        <button className={active === 'shorts' ? 'active' : ''} onClick={() => navigate('shorts')}><PlayCircle size={18}/>{t.navShorts}</button>
        <button className={active === 'events' ? 'active' : ''} onClick={() => navigate('events')}><CalendarDays size={18}/>{t.navEvents}</button>
        <button className={active === 'alerts' ? 'active' : ''} onClick={() => navigate('alerts')}><Bell size={18}/>{t.navAlerts}</button>
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><ShieldCheck size={18}/></div><strong>Stay informed. Stay safe.</strong><p>Use verified links. Never share your OTP with anyone.</p><a href="https://www.cybercrime.gov.in/" target="_blank" rel="noreferrer">Safety resources <ArrowUpRight size={13}/></a></div>
        <div className="sidebar-footer"><span className="online-dot"/><span>Citizen-first information</span><CircleHelp size={15}/></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={21}/></button>
        <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{active === 'home' ? t.navHome : active === 'schemes' ? t.navSchemes : active === 'shorts' ? t.navShorts : active === 'events' ? t.navEvents : active === 'alerts' ? t.navAlerts : t.eligibility}</strong></div>
        <div className="topbar-actions">
          <label className="language-switch"><Globe2 size={16}/><span>{t.language}</span><select value={language} onChange={e => setLanguage(e.target.value)} aria-label={t.language}><option value="en">English</option><option value="hi">हिन्दी</option></select><ChevronDown size={13}/></label>
          <button className="avatar" title="Citizen profile">S</button>
        </div>
      </header>

      {apiOffline && <div className="offline-banner"><CircleHelp size={16}/>{t.apiOffline}</div>}

      <div className="page-content">
        <section className="welcome-row">
          <div><div className="eyebrow"><span className="eyebrow-dot"/> {t.welcome}</div><h1>{t.ready}</h1><p className="welcome-copy">{t.intro}</p></div>
          <div className="welcome-illustration" aria-hidden="true"><div className="sun-orb"/><div className="illustration-building"><div className="building-roof"/><div className="building-columns"><i/><i/><i/><i/></div><div className="building-base"/></div><div className="illustration-leaf leaf-one"/><div className="illustration-leaf leaf-two"/></div>
        </section>

        <section className="hero">
          <div className="hero-content">
            <div className="hero-kicker"><Sparkles size={14}/> {t.verified}</div>
            <h2>{t.headline.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br/>}</span>)}</h2>
            <p>{t.intro}</p>
            <div className="hero-actions"><button className="btn-primary" onClick={() => navigate('schemes')}>{t.explore}<ArrowRight size={17}/></button><button className="btn-ghost" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>{t.how}<ArrowDownRight size={17}/></button></div>
            <div className="hero-proof"><ShieldCheck size={16}/><span>{t.verifiedSub}</span><span className="proof-separator">•</span><span>Built for every citizen</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="hero-doc"><div className="doc-emblem"><Landmark size={26}/></div><div className="doc-line long"/><div className="doc-line"/><div className="doc-line short"/><div className="doc-check"><Check size={16}/></div></div>
            <div className="floating-card float-check"><span className="float-icon"><FileCheck2 size={18}/></span><span><b>Eligibility guide</b><small>Step-by-step help</small></span><Check size={17} className="float-success"/></div>
            <div className="floating-card float-verified"><span className="verified-seal"><ShieldCheck size={18}/></span><span><b>Official links</b><small>Trust, not guesswork</small></span></div>
            <div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">✦</div>
          </div>
          <div className="hero-bottom-note"><span className="note-icon"><BookOpen size={15}/></span><span>Learn it. Check it. Apply with confidence.</span><ArrowUpRight size={15}/></div>
        </section>

        <section id="how-it-works" className="steps-strip">
          <div className="step-intro"><span className="step-number">01 — 03</span><strong>One simple path to support</strong><span>From discovery to your next step.</span></div>
          <div className="step"><span className="step-icon step-blue"><Search size={18}/></span><div><b>Discover</b><small>Find relevant schemes</small></div></div>
          <ArrowRight className="step-arrow" size={17}/>
          <div className="step"><span className="step-icon step-green"><ClipboardCheck size={18}/></span><div><b>Understand</b><small>Review eligibility & docs</small></div></div>
          <ArrowRight className="step-arrow" size={17}/>
          <div className="step"><span className="step-icon step-orange"><ExternalLink size={18}/></span><div><b>Take action</b><small>Visit official portals</small></div></div>
        </section>

        <section id="schemes" className="content-section">
          <div className="section-heading"><div><div className="section-eyebrow">MADE FOR YOUR NEEDS</div><h2>{t.schemes}</h2><p>{t.schemesSub}</p></div><button className="section-link" onClick={() => { setCategory('All'); setQuery(''); }}>{t.viewAll}<ArrowRight size={16}/></button></div>
          <div className="search-filter-row"><label className="search-box"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}/>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label><button className="filter-button" onClick={() => setCategory(category === 'All' ? 'Education' : 'All')}><span className="filter-dot"/>{category === 'All' ? 'Quick filter' : category}<ChevronDown size={15}/></button></div>
          <div className="category-tabs" role="tablist" aria-label="Scheme categories">{categories.map(c => <button role="tab" aria-selected={category === c} className={category === c ? 'selected' : ''} key={c} onClick={() => setCategory(c)}>{c}</button>)}</div>
          {filteredSchemes.length ? <div className="scheme-grid">{filteredSchemes.map(renderScheme)}</div> : <div className="empty-state"><Search size={26}/><strong>{t.noResults}</strong><button className="text-button" onClick={() => { setQuery(''); setCategory('All'); }}>Reset filters</button></div>}
          <div className="section-footnote"><ShieldCheck size={15}/><span>Scheme summaries are for orientation. Rules, benefits and deadlines can change; confirm on the official website.</span></div>
        </section>

        <section className="eligibility-banner">
          <div className="eligibility-art"><div className="elig-circle circle-one"/><div className="elig-circle circle-two"/><div className="elig-paper"><FileText size={29}/><span/><span/><span/></div><div className="elig-check"><Check size={18}/></div></div>
          <div className="eligibility-copy"><span className="section-eyebrow">YOUR NEXT STEP</span><h2>Not sure where you qualify?</h2><p>Answer a few simple questions to get a preliminary checklist and links to official requirements.</p><button className="btn-primary" onClick={() => { setActive('eligibility'); setTimeout(() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' }), 0); }}>{t.check}<ArrowRight size={17}/></button></div>
          <div className="eligibility-side-note"><ShieldCheck size={18}/><span>Guidance, not a final decision</span></div>
        </section>

        <section id="eligibility" className="content-section eligibility-section">
          <div className="section-heading"><div><div className="section-eyebrow">PERSONALISED GUIDANCE</div><h2>{t.eligibility}</h2><p>Answer only what you are comfortable sharing. This demo does not save your answers.</p></div><span className="private-note"><ShieldCheck size={15}/> Not stored</span></div>
          <form className="eligibility-form" onSubmit={runEligibility}>
            <label className="field full-field"><span>{t.selectScheme}</span><select required value={form.schemeId} onChange={e => { setForm({ ...form, schemeId: e.target.value }); setSelectedScheme(schemes.find(s => s.id === e.target.value) || null); }}><option value="">Select a scheme to review...</option>{schemes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
            <label className="field"><span>{t.age}</span><input type="number" min="0" max="120" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}/></label>
            <label className="field"><span>{t.state}</span><input placeholder="e.g. Uttar Pradesh" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}/></label>
            <label className="field"><span>{t.occupation}</span><select value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })}><option value="student">Student</option><option value="farmer">Farmer</option><option value="employed">Employed</option><option value="self-employed">Self-employed</option><option value="unemployed">Not currently employed</option><option value="other">Other</option></select></label>
            <label className="field"><span>{t.income}</span><input type="number" min="0" placeholder="Optional" value={form.annualIncome} onChange={e => setForm({ ...form, annualIncome: e.target.value })}/></label>
            <label className="field"><span>{t.home}</span><select value={form.ownsHome} onChange={e => setForm({ ...form, ownsHome: e.target.value })}><option value="no">No / not sure</option><option value="yes">Yes</option></select></label>
            <label className="field"><span>{t.student}</span><select value={form.isStudent ? 'yes' : 'no'} onChange={e => setForm({ ...form, isStudent: e.target.value === 'yes' })}><option value="yes">Yes</option><option value="no">No</option></select></label>
            <div className="form-submit-row"><p><ShieldCheck size={15}/> Your answers are used only to generate guidance in this demo.</p><button className="btn-primary" type="submit">{t.runCheck}<ArrowRight size={16}/></button></div>
          </form>
          {eligibility && <div className="guidance-result">{eligibility.error ? <p className="error-text">{eligibility.error}</p> : <><div className="result-heading"><div className="result-check"><ClipboardCheck size={20}/></div><div><span className="section-eyebrow">PRELIMINARY GUIDANCE</span><h3>{eligibility.scheme.name}</h3></div></div><p>{eligibility.summary}</p><div className="result-columns"><div><h4><Check size={16}/>{t.requirements}</h4><ul>{eligibility.checklist.map(item => <li key={item}>{item}</li>)}</ul></div><div><h4><FileText size={16}/>{t.docs}</h4><ul>{eligibility.documents.map(item => <li key={item}>{item}</li>)}</ul></div></div><div className="result-notes">{eligibility.notes.map(note => <p key={note}><CircleHelp size={15}/>{note}</p>)}</div><a className="btn-primary inline-btn" href={eligibility.scheme.officialUrl} target="_blank" rel="noreferrer">{t.official}<ExternalLink size={15}/></a></>}</div>}
        </section>

        <section id="shorts" className="content-section shorts-section">
          <div className="section-heading"><div><div className="section-eyebrow">INFORMATION, NOT NOISE</div><h2>{t.shorts}</h2><p>{t.shortsSub}</p></div><span className="section-chip"><PlayCircle size={15}/> QUICK READS</span></div>
          <div className="shorts-grid">{updates.map((item, i) => <article className={'short-card short-' + i} key={item.id}><div className="short-visual"><span className="short-number">0{i + 1}</span>{i === 0 ? <BookOpen size={39}/> : i === 1 ? <FileCheck2 size={39}/> : <ShieldCheck size={39}/>}<span className="short-play"><ArrowUpRight size={18}/></span></div><div className="short-body"><div className="short-meta"><span>{item.type}</span><span><Clock3 size={13}/>{item.readTime}</span></div><h3>{item.title}</h3><p>{item.description}</p><a href={item.officialUrl} target="_blank" rel="noreferrer" className="text-button">{t.read}<ArrowRight size={15}/></a></div></article>)}</div>
        </section>

        <section id="events" className="content-section events-section">
          <div className="section-heading"><div><div className="section-eyebrow">CONNECTED TO PUBLIC SERVICES</div><h2>{t.events}</h2><p>{t.eventsSub}</p></div><a className="section-link" href="https://www.india.gov.in/" target="_blank" rel="noreferrer">India.gov.in <ArrowUpRight size={16}/></a></div>
          <div className="events-grid">{events.map((event, i) => <article className="event-card" key={event.id}><div className={'event-icon event-' + i}>{i === 0 ? <MapPin size={21}/> : i === 1 ? <Bell size={21}/> : <Landmark size={21}/>}</div><div className="event-type">{event.category}</div><h3>{event.title}</h3><p>{event.description}</p><div className="event-date"><CalendarDays size={14}/>{event.dateLabel}</div><a href={event.officialUrl} target="_blank" rel="noreferrer" className="event-link">Open resource <ArrowUpRight size={15}/></a></article>)}</div>
        </section>

        <section id="alerts" className="alerts-section">
          <div className="alerts-art"><div className="alert-ring ring-one"/><div className="alert-ring ring-two"/><div className="alert-bell"><Bell size={32}/><span/></div><div className="alert-star">✦</div></div>
          <div className="alerts-content"><span className="section-eyebrow">YOUR PREFERENCES</span><h2>{t.alerts}</h2><p>{t.alertsSub}</p>
            <form onSubmit={subscribe} className="alerts-form"><label className="sr-only" htmlFor="alert-email">{t.email}</label><input id="alert-email" type="email" required placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)}/><button type="submit" className="btn-primary">{t.subscribe}<ArrowRight size={16}/></button></form>
            <div className="topic-picker"><span>{t.allTopics}</span>{['Education', 'Health', 'Housing', 'Agriculture', 'Business'].map(topic => <label key={topic} className={topics.includes(topic) ? 'topic-active' : ''}><input type="checkbox" checked={topics.includes(topic)} onChange={e => setTopics(e.target.checked ? [...topics, topic] : topics.filter(t => t !== topic))}/>{topic}</label>)}</div>
            {alertMessage && <p className="alert-feedback" role="status">{alertMessage}</p>}
            <p className="alert-disclaimer"><Bell size={13}/> Demo only: this validates preferences; email delivery is not configured.</p>
          </div>
        </section>

        <footer className="footer"><a className="footer-brand" href="#top" onClick={e => {e.preventDefault(); navigate('home')}}><span className="brand-mark"><Landmark size={18}/></span><b>nagrik<span>OS</span></b></a><p>{t.disclaimer}</p><div className="footer-links"><a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">India.gov.in <ExternalLink size={12}/></a><a href="https://www.myscheme.gov.in/" target="_blank" rel="noreferrer">myScheme <ExternalLink size={12}/></a><span>Made for citizens, with care.</span></div></footer>
      </div>
    </main>

    {selectedScheme && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedScheme(null); }}><section className="scheme-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setSelectedScheme(null)} aria-label={t.close}><X size={19}/></button><span className="category-pill">{selectedScheme.category}</span><h2 id="modal-title">{selectedScheme.name}</h2><p>{selectedScheme.summary}</p><div className="modal-benefit"><Sparkles size={17}/><span>{selectedScheme.benefits}</span></div><h3>{t.requirements}</h3><ul>{selectedScheme.eligibility.map(item => <li key={item}>{item}</li>)}</ul><h3>{t.docs}</h3><ul>{selectedScheme.documents.map(item => <li key={item}>{item}</li>)}</ul><div className="modal-actions"><button className="btn-primary" onClick={() => { startCheck(selectedScheme); setSelectedScheme(null); }}>{t.checkNow}<ArrowRight size={16}/></button><a href={selectedScheme.officialUrl} target="_blank" rel="noreferrer" className="btn-secondary">{t.official}<ExternalLink size={15}/></a></div><p className="modal-disclaimer"><ShieldCheck size={14}/>{t.disclaimer}</p></section></div>}
  </div>;
}

export default App;
