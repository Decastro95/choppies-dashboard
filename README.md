# Choppies Dashboard

This repo contains Supabase seeds and dashboard frontend.

[![CI](https://github.com/Decastro95/choppies-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/Decastro95/choppies-dashboard/actions/workflows/ci.yml)

---

## 🚀 Project Overview

The **Choppies Dashboard** is a role-based retail management system built with:

- **React 18 + Vite** (frontend)
- **Supabase** (database + auth + seeds)
- **Vercel** (hosting)
- **GitHub Actions** (CI/CD + ERD auto-generation)

It supports multiple roles:

- CEO
- Manager
- Supplier
- Cashier

Each role has its own restricted dashboard, secured with Supabase Auth and React Router v6 guards.

---

## ⚙️ Development

Clone and install dependencies:

```bash
git clone https://github.com/Decastro95/choppies-dashboard.git
cd choppies-dashboard
npm install
Run locally:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
Preview the build:

bash
Copy code
npm run preview
🗄️ Database & Seeds
Supabase SQL schema and seeds are in:

bash
Copy code
/supabase/seeds/
Run them in the Supabase SQL Editor to initialize your database.

📊 ERD (Entity Relationship Diagram)
We use Mermaid + GitHub Actions to auto-generate diagrams from docs/erd.mmd.

To generate locally:

bash
Copy code
npm run erd
This creates:

docs/erd.png

docs/erd.svg

GitHub Actions will also auto-update these on push.

🚀 Deployment
We use Vercel for deployment. Every push to main triggers:

Lint + build check

Supabase schema ERD update

Security audit (npm audit fix --force)

Vercel preview / production deploy

🤝 Contributing
We follow a lightweight Git convention to keep history clean and CI/CD predictable.

🔖 Branch Naming Convention
feat/<feature-name> → new features

fix/<bug-name> → bug fixes

hotfix/<urgent-fix> → production-critical fixes

chore/<task> → tooling/config/infra

docs/<section> → documentation only

Examples:

bash
Copy code
feat/supplier-dashboard
fix/login-redirect
hotfix/payment-crash
docs/update-readme
✍️ Commit Message Format
php-template
Copy code
<type>: <short summary>
Types
feat: a new feature

fix: a bug fix

chore: maintenance, tooling, configs (no app code changes)

docs: documentation changes

style: formatting only (no logic changes)

refactor: code changes that don’t add new features or fix bugs

test: adding or updating tests

Examples
pgsql
Copy code
feat: add Supplier dashboard role
fix: rename withRoleGuard.js → .jsx for JSX support
chore: update ERD GitHub workflow to commit new diagrams
docs: add ERD auto-generation section to README
⚡ Workflow
Create a feature branch from main:

bash
Copy code
git checkout -b feat/supplier-dashboard
Make your changes

Commit using the format above

Push your branch:

bash
Copy code
git push origin feat/supplier-dashboard
Open a Pull Request

✅ CI/CD runs automatically:

Lint + build

Auto-generate ERD

Deploy preview

Merge only after checks pass.

📜 License
MIT © 2025 Choppies Dashboard
```
