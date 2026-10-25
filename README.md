# NagrikOS 🇮🇳

**Know Your Rights. Discover Opportunities. Stay Connected.**

NagrikOS is a citizen-first public-service prototype that brings Indian government schemes, preliminary eligibility guidance, public-service updates, events, and relevant scholarship opportunities into one interface.

> **Scope and accuracy:** NagrikOS is an independent prototype, not a government website. Its scheme, update, and event content is curated and is not a live government feed. Eligibility results and personalized scholarship suggestions are preliminary guidance only. Always confirm current rules, deadlines, and application requirements through the linked official sources.

## Features in the current prototype

- Responsive React interface with English and Hindi language selection
- Language preference persists across page refreshes and updates the document language for accessibility
- Scheme directory with search, category filters, summaries, requirements, and official links
- Rule-based preliminary eligibility guidance, document checklists, and alternative scheme suggestions
- Curated news feed with 20 prewritten summaries, dynamic article-detail pages, and official source links
- Curated public events and resources
- Presentation-only sign-in state with student-focused scholarship recommendations
- Scholarship opportunities listed on the signed-in Alerts page
- Email and topic preference form for signed-out visitors; the API validates preferences but does **not** send email or store subscriptions
- Express API health endpoint and curated data endpoints
- Curated data needs no database. Optional Hindi article translation uses the free, self-hosted LibreTranslate service; no LLM is used

> **Translation scope:** Shared interface labels use the built-in English/Hindi dictionary. News article content can be machine-translated into Hindi through a separately running LibreTranslate instance. Translation may be imperfect; verify important details with the linked official source.

## Technology

- **Frontend:** React 18, Vite, React Router, Lucide icons, responsive CSS
- **Backend:** Node.js and Express
- **Data:** Curated JavaScript records in `server/src/data/schemes.js`
- **Testing:** Node.js built-in test runner
- **Deployment:** Frontend can run as a static site; backend runs as a Node web service

The current implementation uses curated in-memory/static data. The future product may add verified data ingestion, persistent storage, stronger authentication, and real notification delivery.

## Live prototype

- **NagrikOS website:** https://nagrikos-1-hn7c.onrender.com/
- **Backend API health:** https://nagrikos-oq90.onrender.com/api/health

The public website is a deployed prototype. Some capabilities, including secure authentication, live eligibility verification, persistent alert preferences, and automated notifications, are not implemented yet.

## Run locally

**Requirements:** Node.js 20+ and npm.

From the repository root:

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

Local URLs:

- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/health
- Scheme list: http://localhost:5000/api/schemes

The Vite development server proxies `/api` requests to the Express API on port 5000. Scheme and event records live in `server/src/data/schemes.js`; the 20 curated news articles live in `server/src/data/news.js`. No database setup is needed.

### Environment variables

Use the example files as a guide:

- `PORT` — backend port (defaults to `5000`)
- `CLIENT_ORIGIN` — optional comma-separated list of allowed frontend origins
- `LIBRETRANSLATE_URL` — optional base URL for a self-hosted LibreTranslate service, e.g. `http://localhost:5001`
- `VITE_API_BASE` — optional frontend API base URL; for a separately deployed API, set it to the API URL ending in `/api`, such as `https://your-api.example.com/api`

If you change `VITE_API_BASE`, rebuild the frontend.

### Optional free Hindi article translation

LibreTranslate is open-source. The demo tries the community-hosted `https://translate.argosopentech.com` mirror by default, but that service may be rate-limited or unavailable. For predictable local development, you can run your own instance without a paid translation API. Install it with Python 3.8+ and use a port different from the NagrikOS API:

```bash
pip install libretranslate
libretranslate --host 127.0.0.1 --port 5001 --load-only en,hi
```

In another terminal, set `LIBRETRANSLATE_URL=http://localhost:5001` in `server/.env`, then restart the Express server. The detail page requests translation only when Hindi is selected. If translation fails, the page shows the original English content and a fallback notice. For more reliable deployment, host LibreTranslate separately and set `LIBRETRANSLATE_URL` to its reachable base URL; the software is free but still uses server resources. The community mirror is a best-effort demo default, not a production SLA.

## API reference

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health/status |
| GET | `/api/schemes?q=&category=` | Search/filter curated schemes |
| GET | `/api/schemes/:id` | Retrieve one scheme |
| GET | `/api/updates` | Read 20 curated news articles and prewritten summaries |
| POST | `/api/translate/news/:id` | Translate one news article into Hindi using LibreTranslate when configured |
| GET | `/api/events` | Read curated events |
| POST | `/api/eligibility/check` | Return preliminary rule-based guidance and possible alternatives |
| POST | `/api/alerts/subscribe` | Validate email/topic preferences; does not send email or persist a subscription |

## Run checks

```bash
npm test --prefix server
npm run build --prefix client
```

GitHub Actions is configured to run project checks on pushes and pull requests.

## Deploy on Render

**Backend web service**
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Set `CLIENT_ORIGIN` to the deployed frontend origin.

**Frontend static site**
- Root directory: `client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Set `VITE_API_BASE` to the backend's public URL ending in `/api`.
- Add a rewrite from `/*` to `/index.html` for client-side routes.

## Prototype limitations and next steps

- **Eligibility:** The rule engine only evaluates a subset of profile fields and simplified rules. It is not an official eligibility decision and may not cover all scheme conditions.
- **Personalization/sign-in:** The current sign-in is a hardcoded, client-side presentation flow. It is not secure authentication, and session state is not backed by a real account service.
- **Alerts:** The signed-in page displays scholarship opportunities; it does not send automated notifications. The signed-out form validates preferences only, with no email delivery or persistent subscription storage.
- **Content freshness:** Scheme, news, and event records are curated static content, not a live feed. The 20 news entries include prewritten summaries and links to official government sources. Verify source links and current notifications before relying on information.
- **Production readiness:** Before real public use, add verified and regularly refreshed official data, persistent storage, secure authentication where needed, a notification provider, accessibility/security/privacy reviews, and scheme-specific validation.

Do not use this prototype to make final decisions about eligibility or submit sensitive personal information.

## Project structure

```
client/
  src/
    App.jsx
    main.jsx
    context/AppContext.jsx
    pages/
    components/
    data/translations.js
    styles.css
server/
  src/
    index.js
    data/schemes.js
    data/schemes.test.js
    data/news.js
    data/news.test.js
```

Built by **Team Technox**.
