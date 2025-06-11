// src/components/movies/ShowtimeNav/index.jsx
import React, { useRef, useState } from "react";
import styles from "./index.module.css";

export default function ShowtimeNav() {
  const dates = [
    { label: "Today", value: "today" },
    { label: "Mon 26 Dec", value: "2022-12-26" },
    { label: "Tue 27 Dec", value: "2022-12-27" },
    { label: "Wed 28 Dec", value: "2022-12-28" },
    { label: "Thu 29 Dec", value: "2022-12-29" },
    { label: "Fri 30 Dec", value: "2022-12-30" },
    { label: "Sat 31 Dec", value: "2022-12-31" },
    { label: "Sun 1 Jan", value: "2023-01-01" },
    { label: "Sun 1 Jan", value: "2023-01-01" },
    { label: "Sun 1 Jan", value: "2023-01-01" },
    { label: "Sun 1 Jan", value: "2023-01-01" },
    { label: "Sun 1 Jan", value: "2023-01-01" },
    { label: "Sun 1 Jan", value: "2023-01-01" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // обычный плавный скрол
  const scrollBy = (delta) =>
    containerRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  // «бесконечный» Prev
  const showPrev = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollLeft <= 0) {
      // если в начале — прыгнуть в конец
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      scrollBy(-200);
    }
  };

  // «бесконечный» Next
  const showNext = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
      // если в конце — прыгнуть в начало
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollBy(200);
    }
  };

  return (
    <div className={styles["showtime-nav"]}>
      {/* ← Prev */}
      <button
        className={`${styles["showtime-nav__arrow"]} ${styles["showtime-nav__arrow--prev"]}`}
        onClick={showPrev}
        aria-label="Previous dates"
      >
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      {/* Маскирующая обёртка */}
      <div className={styles["showtime-nav__mask"]}>
        <div className={styles["showtime-nav__date-list"]} ref={containerRef}>
          {dates.map((d, idx) => (
            <button
              key={d.value}
              className={`${styles["showtime-nav__date-button"]} ${
                idx === activeIndex
                  ? styles["showtime-nav__date-button--active"]
                  : ""
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              {d.label.toUpperCase()}
            </button>
          ))}
        </div>
        {/* градиент фейд справа — опционально */}
        <div className={styles["showtime-nav__fade"]} />
      </div>

      {/* → Next */}
      <button
        className={`${styles["showtime-nav__arrow"]} ${styles["showtime-nav__arrow--next"]}`}
        onClick={showNext}
        aria-label="Next dates"
      >
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    </div>
  );
}
