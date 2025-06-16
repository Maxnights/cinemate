# 🎬 Cinemate

Adaptive online cinema built with **React 18**, **Vite** and **Bun**. Browse movies, pick seats, grab snacks — all in one streamlined flow.

---

## Live demo

[https://cinemate-ashen.vercel.app/](https://cinemate-ashen.vercel.app/)

---

## Quick start

```bash
git clone https://github.com/kirill-dorkin/cinemate.git
cd cinemate

bun install
bun run dev     
```

Copy `.env.example` → `.env` and set any required vars (e.g. `VITE_API_URL`).

---

## Scripts

| Script            | What it does                |
| ----------------- | --------------------------- |
| `bun run dev`     | Start dev server (HMR)      |
| `bun run build`   | Production bundle → `dist/` |
| `bun run preview` | Preview the prod build      |
| `bun run test`    | Run unit tests              |
| `bun run lint`    | ESLint + Prettier           |
| `bun run format`  | Format code with Prettier   |

---

## Documentation

Developer docs live in [`/docs`](./docs/). Start with **[Setup](./docs/setup.md)** → **[Contributing](./docs/contributing.md)**.

---

## Project structure

```
src/
  assets/
  components/
  pages/
  hooks/
  data/
  styles/
docs/
```

Tests sit next to the files they cover. Max depth: 3 folders.

---

## Roadmap

* Real REST API integration
* i18n (react‑i18next)
* Payment provider demo
* SSR / Next.js migration

Ideas welcome — open an Issue 🚀

---

## License

MIT © 2025 [ME AMD BRO](https://github.com/kirill-dorkin)
