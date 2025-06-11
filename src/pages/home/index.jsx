// src/pages/HomePage.js

import React, { useState } from "react";
import styles from "./styles.module.css";
import Slider from "../../components/movies/Slider";
import ShowtimeNav from "../../components/movies/ShowtimeNav";
import ShowtimesList from "../../components/movies/ShowtimesList";

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState("2023-12-26");

  return (
    <main className={`${styles.page} ${styles["home-page"]}`}>
      <section className={styles["slider-container"]}>
        <div className="container">
          <Slider />
        </div>
      </section>

      <section className="showtimes-section">
        <div className="container">
          <h2 className={styles["showtimes-section__title"]}>Showtimes</h2>

          <div className={styles["showtimes-section__controls"]}>
            <div className={styles["showtimes-section__search"]}>
              <div className={styles["search-input"]}>
                <svg
                  className={styles["search-input__icon"]}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.44 5.59 12.36 2.5 8.72 2.5S2 5.59 2 9.14c0 3.55 3.09 6.64 6.72 6.64 1.61 0 3.09-.59 4.22-1.56l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6.8 0C6.01 14 4 11.99 4 9.5S6.01 5 8.7 5s4.7 2.01 4.7 4.5S11.39 14 8.7 14z" />
                </svg>
                <input
                  type="text"
                  className={styles["search-input__field"]}
                  placeholder="Search movies"
                />
              </div>
            </div>

            <button className={styles["showtimes-section__filter"]}>
              <span>Filter movies</span>
              <svg
                className={styles["filter-icon"]}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm-2 6h14v2H5v-2z" />
              </svg>
            </button>
          </div>

          <ShowtimeNav
            onDateChange={setSelectedDate}
            selectedDate={selectedDate}
          />

          <ShowtimesList dateKey={selectedDate} />
        </div>
      </section>
    </main>
  );
}
