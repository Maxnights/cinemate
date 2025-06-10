/*  src/components/movies/ShowtimeNav/index.jsx  */
import React, { useRef, useState } from 'react';
import styles from './index.module.css';

export default function ShowtimeNav() {
  /** demo dates; change to dynamic source if needed */
  const dates = [
    { label: 'Today', value: 'today' },
    { label: 'Mon 26 Dec', value: '2022-12-26' },
    { label: 'Tue 27 Dec', value: '2022-12-27' },
    { label: 'Wed 28 Dec', value: '2022-12-28' },
    { label: 'Thu 29 Dec', value: '2022-12-29' },
    { label: 'Fri 30 Dec', value: '2022-12-30' },
    { label: 'Sat 31 Dec', value: '2022-12-31' },
    { label: 'Sun 1 Jan', value: '2023-01-01' },
  ];

  /** index of the active pill */
  const [activeIndex, setActiveIndex] = useState(0);

  /** ref to scrollable list */
  const containerRef = useRef(null);

  /** scroll helper */
  const scrollBy = (delta) =>
    containerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });

  return (
    <div className={styles['showtime-nav']}>
      {/* ← Prev */}
      <button
        className={`${styles['showtime-nav__arrow']} ${styles['showtime-nav__arrow--prev']}`}
        onClick={() => scrollBy(-200)}
        aria-label="Previous dates"
      >
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      {/* Date pills */}
      <div
        className={styles['showtime-nav__date-list']}
        ref={containerRef}
      >
        {dates.map((d, idx) => (
          <button
            key={d.value}
            className={`${styles['showtime-nav__date-button']} ${idx === activeIndex
                ? styles['showtime-nav__date-button--active']
                : ''
              }`}
            onClick={() => setActiveIndex(idx)}
          >
            {d.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* → Next */}
      <button
        className={`${styles['showtime-nav__arrow']} ${styles['showtime-nav__arrow--next']}`}
        onClick={() => scrollBy(200)}
        aria-label="Next dates"
      >
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    </div>
  );
}
