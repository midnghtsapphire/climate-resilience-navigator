# Deployment Guide

## 1) Environment setup

1. Copy `.env.example` to `.env`.
2. Set required secrets for database, JWT, Stripe, and OpenAI.
3. Keep all secrets out of source control.

## 2) Backend deployment

### Docker Compose

```bash
docker-compose up -d --build
```

Health endpoint: `GET /health`

## 3) Frontend deployment (Vercel)

1. Import repository into Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set required environment variables in Vercel project settings.
5. Use main branch as production branch and PR branches for preview deployments.

## 4) CI/CD automation reference

Recommended automation:
- PR checks: `npm run test`, `npm run lint`, `npm run build`
- Deploy on merge to main through Vercel Git integration

## 5) Production checklist

- [ ] Environment variables set in deployment target
- [ ] Database + Redis reachable
- [ ] Stripe mode and keys validated
- [ ] Health endpoint returns 200
- [ ] Frontend deploy URL verified
- [ ] Security review complete (`SECURITY.md`)
