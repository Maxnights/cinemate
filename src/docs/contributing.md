# Contributing Guide

Thank you for taking the time to improve the project! This guide is intentionally short—just what you need and nothing more.

---

## 1 · Quick Start

```bash
git clone https://github.com/kirill-dorkin/cinemate.git
cd mvre

bun install

bun run dev
```

> **Requirements:** Node ≥ 18 LTS · Bun ≥ 1.1

---

## 2 · Code Style (TL;DR)

* React 18 — **function components only**
* Every unit lives in its own **PascalCase** folder with `index.(jsx)`
* Styles: **CSS Modules** → `index.module.css`, BEM‑like class names
* Imports ordered by `eslint-plugin-simple-import-sort` (core → npm → alias → local)
* Pre‑commit hooks via Husky + lint‑staged (ESLint + Prettier)

---

## 3 · Tests

* **Jest + @testing-library/react**
* Test files live next to the code: `*.test.ts?`
* No snapshots for large DOM trees

---

## 4 · Repo Layout (condensed)

```
src/
  pages/
  components/
  hooks/
  data/
  assets/images/{backgrounds|posters|logos|icons}
  styles/
```

Tests stay **next to** their files. Maximum folder depth: 3.

---

## 5 · Have Questions?

Chat with us on Discord → **#mvre-dev** or open an Issue with the `question` label—we reply quickly.

---

*Last updated: 2025‑06‑10*
