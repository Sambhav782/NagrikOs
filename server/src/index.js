import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { schemes, events } from './data/schemes.js';
import { news } from './data/news.js';

const app = express();
const PORT = process.env.PORT || 5000;
const LIBRETRANSLATE_URL = (process.env.LIBRETRANSLATE_URL || 'https://translate.argosopentech.com').replace(/\/$/, '');
const translatedNewsCache = new Map();

app.use(cors({ origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'NagrikOS API', mode: 'curated-demo-data' });
});

app.get('/api/schemes', (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase();
  const category = String(req.query.category || 'All');
  const results = schemes.filter((scheme) => {
    const searchable = [scheme.name, scheme.summary, scheme.category, scheme.ministry, ...scheme.tags].join(' ').toLowerCase();
    return (!q || searchable.includes(q)) && (category === 'All' || scheme.category === category);
  });
  res.json({ data: results, total: results.length, mode: 'curated-demo-data' });
});

app.get('/api/schemes/:id', (req, res) => {
  const scheme = schemes.find((item) => item.id === req.params.id);
  if (!scheme) return res.status(404).json({ error: 'Scheme not found' });
  res.json({ data: scheme });
});

// Evaluate only the criteria represented by the current demo form. These are
// profile-matching rules for the prototype, not a substitute for official checks.
function evaluateScheme(scheme, profile) {
  const age = profile.age === '' || profile.age === undefined ? null : Number(profile.age);
  const occupation = String(profile.occupation || '').toLowerCase();
  const isStudent = profile.isStudent === true;
  const ownsHome = profile.ownsHome === 'yes';

  switch (scheme.id) {
    case 'pm-kisan':
      if (occupation !== 'farmer') {
        return { result: 'not_eligible', reason: 'Your selected occupation is not farmer. This demo matches PM-KISAN to farmer profiles.' };
      }
      if (age !== null && age < 18) {
        return { result: 'not_eligible', reason: 'The applicant should be an adult to proceed with this application.' };
      }
      return { result: 'eligible', reason: 'Your farmer profile matches the basic demo criteria. Land records and exclusion rules still need official verification.' };
    case 'pm-awas-urban':
      if (profile.ownsHome === 'unsure' || profile.ownsHome === '') {
        return { result: 'needs_verification', reason: 'You have not confirmed whether your household owns a home. This is an important condition for housing assistance.' };
      }
      if (ownsHome) {
        return { result: 'not_eligible', reason: 'You indicated that you already own a home. This demo treats that as a mismatch for first-home housing assistance; verify the applicable PMAY-U 2.0 vertical rules.' };
      }
      return { result: 'eligible', reason: 'You indicated that you do not own a home, matching one basic demo criterion. Income, household, location, and vertical-specific rules still need verification.' };
    case 'nsp':
      return isStudent
        ? { result: 'eligible', reason: 'Your student profile matches the basic demo criteria. The exact scholarship, course, academic performance, income, and category requirements still apply.' }
        : { result: 'not_eligible', reason: 'You indicated that you are not currently a student. The scholarships represented by this portal generally require student enrolment.' };
    case 'stand-up-india':
      return occupation === 'self-employed'
        ? { result: 'eligible', reason: 'Your self-employed profile matches the basic demo criteria. Applicant category, greenfield enterprise, and lender conditions still need verification.' }
        : { result: 'not_eligible', reason: 'Your current profile does not indicate self-employment or a business applicant. This demo therefore does not match you to Stand-Up India.' };
    case 'mudra':
      return occupation === 'self-employed'
        ? { result: 'eligible', reason: 'Your self-employed profile matches the basic demo criteria. Business activity, credit assessment, and lender conditions still apply.' }
        : { result: 'not_eligible', reason: 'Your current profile does not indicate a business or self-employment activity, which this demo uses as the basic MUDRA match.' };
    case 'atal-pension':
      if (age === null) return { result: 'needs_verification', reason: 'Enter your age to check the basic age range for Atal Pension Yojana.' };
      return age >= 18 && age <= 40
        ? { result: 'eligible', reason: 'Your age is within the basic 18–40 demo range. Current participation rules and bank-account conditions still need verification.' }
        : { result: 'not_eligible', reason: 'Your age is outside the basic 18–40 range used by this demo for Atal Pension Yojana.' };
    case 'ayushman-bharat':
      return { result: 'needs_verification', reason: 'PM-JAY eligibility depends on official beneficiary records and applicable state rules, which this form cannot verify.' };
    case 'ujjwala':
      return { result: 'needs_verification', reason: 'This form does not ask whether the applicant is an adult woman or whether the household meets the LPG and deprivation criteria required by the scheme.' };
    default:
      return { result: 'needs_verification', reason: 'The current demo does not have enough structured rules for this scheme to make a reliable match.' };
  }
}

app.post('/api/eligibility/check', (req, res) => {
  const profile = req.body || {};
  const { schemeId, age } = profile;
  const scheme = schemes.find((item) => item.id === schemeId);
  if (!scheme) return res.status(404).json({ error: 'Choose a valid scheme to check.' });
  if (age !== undefined && age !== '' && (!Number.isFinite(Number(age)) || Number(age) < 0 || Number(age) > 120)) {
    return res.status(400).json({ error: 'Enter a valid age.' });
  }

  const evaluation = evaluateScheme(scheme, profile);
  const alternatives = schemes
    .filter((candidate) => candidate.id !== scheme.id)
    .map((candidate) => ({ scheme: candidate, evaluation: evaluateScheme(candidate, profile) }))
    .filter(({ evaluation: candidateEvaluation }) => candidateEvaluation.result === 'eligible')
    .slice(0, 3)
    .map(({ scheme: candidate, evaluation: candidateEvaluation }) => ({
      id: candidate.id,
      name: candidate.name,
      category: candidate.category,
      summary: candidate.summary,
      officialUrl: candidate.officialUrl,
      reason: candidateEvaluation.reason
    }));

  const notes = [
    'This is a demo profile match, not an official eligibility decision. Rules may vary by scheme, state, category, and current government notification.',
    'Before applying, confirm the latest criteria and document list on the official scheme portal.'
  ];
  if (profile.state) notes.push('State or union-territory rules may affect eligibility.');
  if (profile.annualIncome !== '' && profile.annualIncome !== undefined) {
    notes.push('Your income was not compared with a numeric threshold because the relevant scheme-specific threshold is not encoded in this demo.');
  }

  res.json({
    scheme: { id: scheme.id, name: scheme.name, officialUrl: scheme.officialUrl },
    result: evaluation.result,
    summary: evaluation.reason,
    checklist: scheme.eligibility,
    documents: evaluation.result === 'eligible' ? scheme.documents : [],
    notes,
    alternatives
  });
});

app.post('/api/translate/news/:id', async (req, res) => {
  const { targetLanguage = 'hi' } = req.body || {};
  if (targetLanguage !== 'hi') return res.status(400).json({ error: 'Only Hindi translation is enabled in this demo.' });
  const article = news.find((item) => item.id === req.params.id);
  if (!article) return res.status(404).json({ error: 'News article not found.' });
  const cacheKey = `${article.id}:hi`;
  if (translatedNewsCache.has(cacheKey)) return res.json({ data: translatedNewsCache.get(cacheKey), cached: true });

  try {
    const fields = ['title', 'description', 'summary', 'fullContent', 'ministry', 'category'];
    const translatedFields = await Promise.all(fields.map(async (field) => {
      const value = article[field];
      if (!value) return [field, value];
      const response = await fetch(`${LIBRETRANSLATE_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: value, source: 'en', target: 'hi', format: 'text' })
      });
      if (!response.ok) throw new Error(`LibreTranslate returned HTTP ${response.status}`);
      const payload = await response.json();
      if (!payload.translatedText) throw new Error('LibreTranslate returned an empty translation.');
      return [field, payload.translatedText];
    }));
    const translatedArticle = { ...article, ...Object.fromEntries(translatedFields) };
    translatedNewsCache.set(cacheKey, translatedArticle);
    res.json({ data: translatedArticle, cached: false });
  } catch (error) {
    console.error('News translation failed:', error.message);
    res.status(502).json({ error: 'Hindi translation failed. Please try again later.' });
  }
});

app.get('/api/updates', (_req, res) => res.json({ data: news }));
app.get('/api/events', (_req, res) => res.json({ data: events }));

app.post('/api/alerts/subscribe', (req, res) => {
  const { email, language = 'en', categories = [] } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  // Demo subscription only. Add a delivery provider and persistent storage before production use.
  res.status(202).json({ message: 'Preferences validated. Email delivery is not enabled in this demo.', subscription: { email, language, categories } });
});

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => console.log(`NagrikOS API listening on http://localhost:${PORT}`));
