## [1.0.1] — 2025-06-10

### Chore
- Organized `src/assets/images` folder structure into `backgrounds`, `posters`, `logos`, and `icons`
- Scaffolded documentation under `docs/` (setup.md, contributing.md, coding-standards.md, api-reference.md, style-guide.md, faq.md, roadmap.md, documentation.md)

### Refactor
- Overhauled `src/pages/` component structure and migrated all page-level styles to CSS Modules  
- Updated imports and `className` references in page components to use module-scoped classes for better encapsulation and maintainability  
- Reworked `src/components/` directory structure to mirror the new **pages** convention (PascalCase folders + barrel `index` files)  
- Updated all component imports, style hooks and test references after the restructure for cleaner, shorter paths

### Fix
- Patched broken imports and resolved runtime warnings in `Footer`, `TrailerCarousel` and several related components caused by the path changes  
- Removed unused variables and corrected prop names uncovered during the cleanup

### Docs
- Removed placeholder docs (`api-reference.md`, `style-guide.md`, `faq.md`, `roadmap.md`) to keep `/docs` lean
- Added and filled out essential docs: `README.md`, `setup.md`, `contributing.md`, `coding-standards.md`, `documentation.md`
