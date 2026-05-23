# Security Policy

## Supported scope

This repository contains a production-oriented frontend and backend stack; security defects should be reported responsibly.

## Reporting a vulnerability

- Email: security@example.com
- Include reproduction steps, impacted routes/components, and severity estimate.

## Security baseline

- Secrets are provided via environment variables only
- Authenticated API routes use JWT-based protection
- Billing routes are server-side and not trusted from client-only input
- Dockerized deployment is supported for controlled runtime consistency

## Hardening checklist

- [ ] Rotate JWT, Stripe, and API secrets on schedule
- [ ] Enforce HTTPS in all deployed environments
- [ ] Restrict CORS to approved origins
- [ ] Monitor dependency vulnerabilities and patch promptly
