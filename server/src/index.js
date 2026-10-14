import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { schemes, updates, events } from './data/schemes.js';

const app = express();
const PORT = process.env.PORT || 5000;

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

app.post('/api/eligibility/check', (req, res) => {
  const { schemeId, age, state, occupation, annualIncome, ownsHome, isStudent } = req.body || {};
  const scheme = schemes.find((item) => item.id === schemeId);
  if (!scheme) return res.status(404).json({ error: 'Choose a valid scheme to check.' });
  const notes = [];
  if (age !== undefined && (Number(age) < 0 || Number(age) > 120)) {
    return res.status(400).json({ error: 'Enter a valid age.' });
  }
  if (state) notes.push('State or union-territory rules may affect eligibility.');
  if (annualIncome !== '' && annualIncome !== undefined && Number(annualIncome) >= 0) notes.push('Income thresholds differ by scheme and may require an official certificate.');
  if (ownsHome === 'yes' && scheme.category === 'Housing') notes.push('Existing home ownership may affect eligibility for some housing benefits.');
  if (occupation === 'student' || isStudent) notes.push('For education support, check the exact scholarship, institution, course, and academic-year requirements.');
  notes.push('This is a preliminary guidance check, not an official eligibility decision. The relevant department or portal makes the final determination.');
  res.json({
    scheme: { id: scheme.id, name: scheme.name, officialUrl: scheme.officialUrl },
    result: 'needs_official_verification',
    summary: 'Your answers are a starting point. Review the requirements below and confirm details on the official scheme portal.',
    checklist: scheme.eligibility,
    documents: scheme.documents,
    notes
  });
});

app.get('/api/updates', (_req, res) => res.json({ data: updates }));
app.get('/api/events', (_req, res) => res.json({ data: events }));

app.post('/api/alerts/subscribe', (req, res) => {
  const { email, language = 'en', categories = [] } = req.body || {};
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  // Demo subscription only. Add a delivery provider and persistent storage before production use.
  res.status(202).json({ message: 'Preferences validated. Email delivery is not enabled in this demo.', subscription: { email, language, categories } });
});

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => console.log(`NagrikOS API listening on http://localhost:${PORT}`));
