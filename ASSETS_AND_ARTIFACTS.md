# Assets and Artifacts Inventory

## Product assets

### Application assets
- Frontend dashboard and mapping UI (`src/`)
- Backend API services (`server/`)
- Dockerized local/production runtime (`Dockerfile`, `docker-compose.yml`)

### Business assets
- Brand positioning and messaging (`BRAND_GUIDELINES.md`)
- Deployment and operational playbooks (`DEPLOYMENT_GUIDE.md`, `SECURITY.md`)
- Revenue framing and market strategy (`GO_TO_MARKET.md`)

## Artifact inventory

### Documentation artifacts
- `README.md` — product purpose and operational quick start
- `CHANGELOG.md` — revision log for revvel-standards progression
- `RESEARCH_ENGINES.md` — discovery engines and recommendation framework
- `ASSETS_AND_ARTIFACTS.md` — consolidated asset/artifact ledger

### Validation artifacts
- `scripts/test-baseline.js` — standards presence check
- `scripts/build-baseline.js` — baseline build execution wrapper
- `package.json` scripts: `test`, `build`, `lint`

### Deployment artifacts
- Vercel website-in-test URL and deployment traceability in `README.md`
- Container deployment workflow in `DEPLOYMENT_GUIDE.md`

## Maintenance guidance

- Update this inventory whenever a new core module, policy, dataset, or market deliverable is introduced.
- Keep artifacts traceable to implementation paths so docs and code remain aligned.
