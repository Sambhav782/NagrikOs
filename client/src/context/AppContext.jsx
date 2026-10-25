import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations.js';

const API_BASE = (import.meta.env.VITE_API_BASE || (import.meta.env.PROD ? 'https://nagrikos-oq90.onrender.com/api' : '/api')).replace(/\/$/, '');
const AppContext = createContext(null);
const SUPPORTED_LANGUAGES = ['en', 'hi', 'ta'];
const LANGUAGE_STORAGE_KEY = 'nagrikos-language';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : 'en';
  } catch {
    return 'en';
  }
}

// Centralize shared data and actions so pages stay focused on presentation.
export function AppProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) return;
    setLanguageState(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Storage may be blocked by browser privacy settings; keep the in-memory selection.
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Temporary frontend sign-in state; replace with secure authentication before production.
  const [user, setUser] = useState(null);
  const signIn = useCallback((username, password) => {
    if (String(username).trim().toLowerCase() !== 'sambhav' || password !== '123456') return false;
    setUser({ username: 'Sambhav', displayName: 'Sambhav Shahi', profileType: 'B.Tech student' });
    return true;
  }, []);
  const signOut = useCallback(() => setUser(null), []);
  const [schemes, setSchemes] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [events, setEvents] = useState([]);
  const [apiOffline, setApiOffline] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [form, setForm] = useState({
    schemeId: '',
    age: '22',
    state: '',
    occupation: 'student',
    annualIncome: '',
    ownsHome: 'no',
    isStudent: true
  });
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState(['Education', 'Health']);
  const [alertMessage, setAlertMessage] = useState('');
  const t = translations[language];

  // Fetch the three read-only collections once for the whole app.
  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetch(`${API_BASE}/schemes`, { signal: controller.signal }).then(checkResponse),
      fetch(`${API_BASE}/updates`, { signal: controller.signal }).then(checkResponse),
      fetch(`${API_BASE}/events`, { signal: controller.signal }).then(checkResponse)
    ])
      .then(([schemeResponse, updateResponse, eventResponse]) => {
        setSchemes(schemeResponse.data || []);
        setUpdates(updateResponse.data || []);
        setEvents(eventResponse.data || []);
        setApiOffline(false);
      })
      .catch((error) => {
        // An aborted request happens during route/app teardown and is not an API outage.
        if (error.name !== 'AbortError') setApiOffline(true);
      });

    return () => controller.abort();
  }, []);

  const runEligibility = useCallback(async (event) => {
    event.preventDefault();
    setEligibility(null);

    try {
      const response = await fetch(`${API_BASE}/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not check your answers.');
      setEligibility(payload);
    } catch (error) {
      setEligibility({ error: error.message || 'Could not connect to the API.' });
    }
  }, [form]);

  const subscribe = useCallback(async (event) => {
    event.preventDefault();
    setAlertMessage('');

    try {
      const response = await fetch(`${API_BASE}/alerts/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language, categories: topics })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not save preferences.');
      setAlertMessage(payload.message);
    } catch (error) {
      setAlertMessage(error.message || 'Could not connect to the API.');
    }
  }, [email, language, topics]);

  const startCheck = useCallback((scheme) => {
    setForm((current) => ({ ...current, schemeId: scheme.id }));
    setSelectedScheme(null);
    setEligibility(null);
  }, []);

  const value = useMemo(() => ({
    language, setLanguage, t, user, signIn, signOut,
    schemes, updates, events, apiOffline,
    selectedScheme, setSelectedScheme,
    eligibility, setEligibility, form, setForm, runEligibility, startCheck,
    email, setEmail, topics, setTopics, alertMessage, subscribe
  }), [
    language, setLanguage, t, user, signIn, signOut, schemes, updates, events, apiOffline, selectedScheme,
    eligibility, form, runEligibility, startCheck, email, topics, alertMessage, subscribe
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Fail fast with a helpful message if a component is mounted outside the provider.
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider.');
  return context;
}

async function checkResponse(response) {
  if (!response.ok) throw new Error('The NagrikOS API request failed.');
  return response.json();
}
