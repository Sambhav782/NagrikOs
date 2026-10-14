# NagrikOS 🇮🇳

**Public services, made simpler.**

NagrikOS is a multilingual citizen-services assistant that helps people discover Indian government schemes, understand requirements, prepare documents, and reach official sources.

> **Important:** This is an independent demo, not a government website. Scheme data is curated starter content, not a live government feed. Eligibility guidance is preliminary only. Always confirm current rules and deadlines on the linked official portal.

## What works in this version

- Responsive dashboard with English/Hindi interface
- Search and category filters across a curated set of schemes
- Scheme details, benefit summaries, requirement lists, and official links
- Preliminary eligibility guidance API and document checklists
- Short-form explainers and links to public-service resources
- Event/resource directory
- Alert preference validation (email delivery is **not** configured)
- Express API health endpoint and optional MongoDB connection
- Demo mode runs without a database or secret keys

## Stack

- **Frontend:** React 18, Vite, Lucide icons, responsive CSS
- **Backend:** Node.js, Express
- **Optional database:** MongoDB via Mongoose
- **Tests:** Node's built-in test runner

## Run locally

Requirements: Node.js 20+ and npm.

Open a terminal in the repository root:

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/health
- Schemes API: http://localhost:5000/api/schemes

The frontend Vite server proxies `/api` requests to port 5000. MongoDB is optional; without `MONGODB_URI`, the API uses the included curated demo data.

### Optional environment variables

Copy `server/.env.example` to `server/.env` and set values as needed:

- `PORT` — API port (default `5000`)
- `CLIENT_ORIGIN` — comma-separated allowed frontend origins
- `MONGODB_URI` — optional MongoDB connection string

For a separately hosted frontend, copy `client/.env.example` to `client/.env` and set `VITE_API_BASE` to the deployed API base URL ending in `/api`, for example `https://your-api.example.com/api`. Rebuild the frontend after changing this variable.

## Checks

```bash
npm test --prefix server
npm run build --prefix client
```

GitHub Actions runs these checks on pushes and pull requests.

## Deploy

Deploy the API as a Node web service with `server` as the root directory, install command `npm install`, and start command `npm start`. Set `CLIENT_ORIGIN` to the deployed frontend origin. Deploy `client` as a static site with build command `npm install && npm run build` and publish directory `dist`. Set `VITE_API_BASE` to the API's public URL ending in `/api` before building.

## Data and production readiness

Before using this for real applications:
1. Replace curated examples with a verified, regularly refreshed dataset from official sources.
2. Store source URLs, last-verified timestamps, scheme versions, and update history.
3. Implement proper persistence and an email/SMS provider before promising alerts.
4. Add authentication only if a real account feature requires it; do not collect Aadhaar, OTPs, or sensitive documents in this prototype.
5. Review scheme-specific rules with authoritative sources and add accessibility, security, privacy, and legal reviews.

## Project structure

```
client/
  src/App.jsx
  src/main.jsx
  src/styles.css
server/
  src/index.js
  src/data/schemes.js
  src/data/schemes.test.js
```

Built by Team Technox as a citizen-first public-service prototype.
