# PrintOut — Administration Dashboard

An administration frontend supporting the PrintOut print-on-demand platform.

[Customer storefront repository](https://github.com/Abdel-Rahman112000/PrintOut-website) · [PrintOut website](https://printout.solutions/)

## Overview

This project provides administrative interfaces for print-commerce operations. It builds on the **Vuexy Next.js and Material UI admin template**, with project-specific screens and backend integrations.

## Application areas

- Product and category administration.
- Order lists and order detail views.
- Customer, vendor, and user management.
- Roles and permissions interfaces.
- Customer chat and custom offer screens.
- Dashboard views and data tables.

The repository also retains template examples and demo data; their presence does not mean every example is a production PrintOut feature.

## Technology

**Next.js 14 · React 18 · TypeScript · Material UI · Redux Toolkit · TanStack Query · TanStack Table · Axios · React Hook Form · Zod**

Additional integrations include NextAuth and Prisma. See [package.json](./package.json) for exact versions.

## Project structure

- `src/app/[lang]/` — localized application routes.
- `src/components/` — shared application components.
- `src/types/api/` — backend data types.
- `src/configs/` — theme and localization configuration.
- `src/data/navigation/` — navigation definitions.
- `src/@core/`, `src/@layouts/`, and `src/@menu/` — template foundations.

## Local development

1. Copy `.env.example` to `.env` and configure the required services.
2. Install dependencies and start the development server:

```bash
yarn install
yarn dev
```

The installation runs Prisma client generation and icon generation. Backend access, authentication configuration, and any required database configuration must be available for the corresponding features.

## Scripts

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the development server. |
| `yarn build` | Create a production build. |
| `yarn start` | Serve the production build. |
| `yarn lint` | Run lint checks. |
| `yarn format` | Format source files. |

## Template attribution

This project uses the Vuexy admin template as its foundation. Existing template and third-party licensing terms continue to apply.

