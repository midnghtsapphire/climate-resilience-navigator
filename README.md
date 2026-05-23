# Climate Resilience Navigator

Climate Resilience Navigator is a full-stack climate risk intelligence product for cities, infrastructure teams, and operators. It combines a Vite + React decision UI with a FastAPI backend for auth, billing, and data APIs.

## What this repository does

- Maps and visualizes climate risk signals for planning and response
- Supports authenticated user workflows and protected API access
- Includes Stripe-ready billing routes for subscription models
- Provides Dockerized local and production-style deployment paths

## How it can be used now

1. Start the backend via Docker (`docker-compose up -d`) or locally with Uvicorn
2. Run the frontend with `npm run dev`
3. Use the dashboard UI to inspect resilience indicators and climate planning data

## Website in Test (Vercel)

- **Test URL:** https://climate-resilience-navigator.vercel.app
- **Deployment automation reference:** see `DEPLOYMENT_GUIDE.md` (Vercel + CI flow)

## S2M value and goal alignment

- **Core value:** helps organizations reduce climate exposure by prioritizing high-impact adaptation interventions.
- **Goal priority:** converts risk data into actionable resilience programs and monetizable subscription workflows.
- **3-year commercial framing:** target a path to **$10M ARR in 3 years** via B2B subscriptions, implementation services, and enterprise analytics add-ons.

## Revvel standards docs in this repo

- `README.md`
- `CHANGELOG.md`
- `DEPLOYMENT_GUIDE.md`
- `GO_TO_MARKET.md`
- `RESEARCH_ENGINES.md`
- `BRAND_GUIDELINES.md`
- `SECURITY.md`
- `ASSETS_AND_ARTIFACTS.md`
- `scripts/test-baseline.js`
- `scripts/build-baseline.js`

## Quick start

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- Python 3.11+ (if running backend outside Docker)

### Frontend

```bash
npm ci
npm run dev
```

### Backend (Docker)

```bash
docker-compose up -d
```

Backend docs: `http://localhost:8005/docs`

## Validation commands

```bash
npm run test
npm run build
npm run lint
```
