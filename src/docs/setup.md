# Setup & Local Development

This guide covers everything you need to run **Cinemate** locally or build it for production.

---

## 1 · Prerequisites

| Tool | Version  |
| ---- | -------- |
| Node | ≥ 18 LTS |
| Bun  | ≥ 1.1    |

> Check versions:
>
> ```bash
> node -v  
> bun -v    
> ```

---

## 2 · Clone & Install

```bash
git clone https://github.com/kirill-dorkin/cinemate.git
cd mvre

bun install               
```

---

## 3 · Running the Dev Server

```bash
bun run dev               
```

*Hot‑reload is enabled. Save a file and the browser refreshes instantly.*

---

## 4 · Available Scripts

| Script            | Purpose                              |
| ----------------- | ------------------------------------ |
| `bun run dev`     | Launch Vite dev‑server               |
| `bun run build`   | Create production bundle in `dist/`  |
| `bun run preview` | Preview the production build locally |
| `bun run lint`    | Run ESLint + Prettier                |
| `bun run test`    | Execute Jest unit tests              |

---

## 5 · Environment Variables

Copy the example file and adjust values as needed:

```bash
cp .env.example .env
```

| Variable       | Default                   | Description                   |
| -------------- | ------------------------- | ----------------------------- |
| `VITE_API_URL` | `https://api.example.com` | Base URL for future API calls |

*All variables must be prefixed with `VITE_` to be exposed to the client.*

---

## 6 · Building for Production

```bash
bun run build
```

Static files appear in `dist/`. Serve them with any static server:

```bash
bunx serve dist    
```

---

## 7 · Troubleshooting

| Issue                           | Fix                                                    |
| ------------------------------- | ------------------------------------------------------ |
| "Styles not applied"            | Ensure file ends with `.module.css` & correct import   |
| "Module not found"              | Check alias paths (`@/…`) or barrel `index.js` missing |
| Jest fails on import of CSS/SVG | Run `bun test` after `bun install` to update mocks     |

---

## 8 · Questions?

Ask in Discord → **#mvre-dev** or open an Issue.

---

*Last updated: 2025‑06‑10*
