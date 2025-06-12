# Project Documentation

> This is the central hub for everything you need to understand, run, and extend **Cinemate**. Each section links to more detailed guides or code examples inside the repository.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Pages & Routing](#pages--routing)
4. [State Management](#state-management)
5. [Guest Sessions](#guest-sessions)
6. [Data & API Layer](#data--api-layer)
7. [Styling System](#styling-system)
8. [Testing Strategy](#testing-strategy)
9. [CI / CD Pipeline](#ci--cd-pipeline)
10. [Deployment Guide](#deployment-guide)
11. [Extending the Project](#extending-the-project)
12. [Glossary](#glossary)

---

## Project Overview

Cinemate is a React 18 SPA built with **Vite** and bundled with **Bun**. The goal is to provide a clean movie‑booking demo with industry‑grade architecture:

* **Component‑driven** UI (atomic design mindset).
* **Lazy‑loaded** routes and assets for optimal performance.
* **CSS Modules** for local scoping and zero runtime.
* Future‑proof hooks‑based data layer (SWR‑compatible).

For local setup instructions, see [`docs/setup.md`](./setup.md).

---

## Folder Structure

```
├── public/                # static assets served as‑is
├── src/
│   ├── assets/            # images, fonts, svg icons
│   ├── components/        # reusable UI atoms & molecules
│   ├── pages/             # route‑level screens (1 folder = 1 route)
│   ├── hooks/             # custom React hooks
│   ├── data/              # mocked JSON (to be replaced by API)
│   ├── styles/            # global variables & mixins
│   └── index.jsx          # app entry point
└── docs/                  # developer documentation (this folder)
```

> **Rule of thumb:** No nesting deeper than three levels. If you find yourself going further, extract a package.

---

## Pages & Routing

Routing is handled by **React Router v6**. Each folder in `src/pages/` exposes an `index.jsx` that lazy‑loads the page component.

* **Home/** – landing page with slider and showtimes.
* **Movies/** – catalog with filters and search.
* **Booking/** – multi‑step wizard (ticket → seat → snacks → payment).

Routes are declared in `src/index.jsx`. Add a new page by:

1. Creating `src/pages/MyPage/index.jsx`.
2. Adding an import in the routes array (`lazy(() => import('@/pages/MyPage'))`).

---

## State Management

| Scope                 | Tool                      | Notes                     |
| --------------------- | ------------------------- | ------------------------- |
| Local UI state        | `useState` / `useReducer` | within component          |
| Cross‑component state | React Context (light)     | e.g. selected seats       |
| Remote data           | Placeholder fetch util    | future: SWR / React Query |

> No Redux here; the app is intentionally lightweight. Introduce Zustand or React Query if the domain grows.

---

## Guest Sessions

Visitors can skip account creation by choosing **Continue as guest** on the login or signup pages. The app stores `{ guest: true }` in `localStorage` and `ProtectedRoute` treats this as an authenticated session. Logging out removes the entry.

---

## Data & API Layer

* Currently mocks live in `src/data/`.  All fetches hit static JSON.
* Replace mocks with real endpoints by editing `services/api.js` (to be generated).
* Keep all network code in **one layer**; UI components must stay API‑agnostic.

---

## Styling System

* **CSS Modules** with `.module.css` suffix.
* BEM‑like naming: `block__element--modifier`.
* Shared variables in `src/styles/variables.css` (colors, spacing, breakpoints).
* Media queries follow mobile‑first approach.

---

## Testing Strategy

* Unit tests: **Jest** + **@testing-library/react**.
* Coverage target ≥ 80 % lines on `main`.
* CI fails if tests or lints fail.

---

## CI / CD Pipeline

GitHub Actions workflow:

1. **Install** – `bun install`.
2. **Lint** – `bun run lint`.
3. **Test** – `bun run test`.
4. **Build** – `bun run build`.
5. **Deploy** – *(optional)* to Vercel / Netlify on push to `main`.

---

## Deployment Guide

Local production build:

```bash
bun run build       
serve dist           
```

| Environment | Platform         | Notes                  |
| ----------- | ---------------- | ---------------------- |
| Preview     | Vercel           | Auto PR previews       |
| Production  | Vercel / Netlify | One‑click, zero‑config |

Adjust `vite.config.js → base` if deploying under a sub‑folder.

---

## Extending the Project

1. **Add a component** → `src/components/MyComponent/` + `index.jsx` + `index.module.css`.
2. **Add a page** → see Pages & Routing section.
3. **Add a hook** → `src/hooks/useSomething.js`.
4. **Update docs** → modify relevant `.md` in `docs/` and increment *Last updated*.

---

## Glossary

| Term            | Description                                 |
| --------------- | ------------------------------------------- |
| **Bun**         | All‑in‑one JS runtime used for dev/build.   |
| **CSS Modules** | Locally scoped CSS in build‑time.           |
| **Barrel**      | `index.js` file that re‑exports folder API. |

---

*Last updated: 2025‑06‑12*
