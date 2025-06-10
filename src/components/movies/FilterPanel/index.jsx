/*  src/components/movies/FilterPanel/index.jsx  */
import React from 'react';
import styles from './index.module.css';

/**
 * <FilterPanel />
 * — Experience / Genre selectors, adapted for CSS-Modules.
 */
export default function FilterPanel({
  experiences,
  genres,
  selectedExperience,
  selectedGenre,
  onExperienceChange,
  onGenreChange,
}) {
  /** helper to build a button class list */
  const btnCls = (isActive) =>
    `${styles['filter-panel__button']} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles['filter-panel']}>
      {/* ───── Experience ───── */}
      <div className={styles['filter-panel__group']}>
        <span className={styles['filter-panel__label']}>Experience:</span>

        <div className={styles['filter-panel__options']}>
          {experiences.map((exp) => (
            <button
              key={exp}
              className={btnCls(selectedExperience === exp)}
              onClick={() => onExperienceChange(exp)}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* ───── Genre ───── */}
      <div className={styles['filter-panel__group']}>
        <span className={styles['filter-panel__label']}>Genre:</span>

        <div className={styles['filter-panel__options']}>
          {genres.map((g) => (
            <button
              key={g}
              className={btnCls(selectedGenre === g)}
              onClick={() => onGenreChange(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
