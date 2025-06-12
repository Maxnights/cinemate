// src/pages/MovieDetailPage.js

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import moviesData from "../../../data/movies";
import ShowtimeNav from "../../../components/movies/ShowtimeNav";
import styles from "./index.module.css";

// Импорт вашего фонового изображения
import showaBg from "../../../assets/images/backgrounds/showa-bg.jpg";

export default function MovieDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const movie = moviesData.find((m) => m.slug === slug);
  if (!movie) {
    return (
      <div
        className={`page ${styles["movie-detail-page"]} movie-detail-page--notfound`}
        style={{ "--bg-image": `url(${showaBg})` }}
      >
        <p>Movie not found.</p>
        <Link to="/movies" className="btn btn--primary">
          Back to All Movies
        </Link>
      </div>
    );
  }

  const {
    title,
    gallery = [],
    poster,
    genres,
    duration,
    rating,
    language,
    subtitles,
    synopsis,
    director,
    cast,
    releaseDate,
    formats,
    showtimes = [],
    trailerUrl,
  } = movie;

  const genresText = genres.join(" · ");
  const formatsText = formats.join(" · ");

  return (
    <div
      className={`page ${styles["movie-detail-page"]}`}
      style={{ "--bg-image": `url(${showaBg})` }}
    >
      {/* === Основной контент === */}
      <div className={styles["movie-detail-page__container"]}>
        {/* Breadcrumbs */}
        <nav className={styles["movie-detail-page__breadcrumbs"]}>
          <Link to="/" className={styles["movie-detail-page__breadcrumb-link"]}>
            Home
          </Link>
          <span className={styles["movie-detail-page__breadcrumb-separator"]}>
            ›
          </span>
          <Link
            to="/movies"
            className={styles["movie-detail-page__breadcrumb-link"]}
          >
            Movies
          </Link>
          <span className={styles["movie-detail-page__breadcrumb-separator"]}>
            ›
          </span>
          <span className={styles["movie-detail-page__breadcrumb-current"]}>
            {title}
          </span>
        </nav>

        {/* Gallery */}
        <div className={styles["movie-detail-page__gallery"]}>
          {(gallery.length > 0 ? gallery : [poster]).map((imgUrl, idx) => (
            <div
              key={idx}
              className={styles["movie-detail-page__gallery-item"]}
            >
              <img
                src={imgUrl}
                alt={`${title} screenshot ${idx + 1}`}
                className={styles["movie-detail-page__gallery-image"]}
              />
            </div>
          ))}
        </div>

        {/* Content columns */}
        <div className={styles["movie-detail-page__content"]}>
          {/* Left info */}
          <div className={styles["movie-detail-page__info"]}>
            <p className={styles["movie-detail-page__meta"]}>{genresText}</p>
            <h1 className={styles["movie-detail-page__title"]}>
              {title} <span className={styles["rating-badge"]}>{rating}</span>
            </h1>
            <div className={styles["movie-detail-page__meta-row"]}>
              <div className={styles["movie-detail-page__duration"]}>
                <svg
                  className={styles["duration-icon"]}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6h4" />
                </svg>
                <span>{duration}</span>
              </div>
              <div className={styles["movie-detail-page__lang-sub"]}>
                <span className={styles["lang-item"]}>{language}</span>
                <span className={styles["lang-item"]}>{subtitles}</span>
              </div>
            </div>
            <p className={styles["movie-detail-page__synopsis"]}>{synopsis}</p>
            <div className={styles["movie-detail-page__extra"]}>
              <div className={styles["movie-detail-page__extra-block"]}>
                <div className={styles["movie-detail-page__extra-label"]}>
                  Director
                </div>
                <div className={styles["movie-detail-page__extra-value"]}>
                  {director}
                </div>
              </div>
              <div className={styles["movie-detail-page__extra-block"]}>
                <div className={styles["movie-detail-page__extra-label"]}>
                  Cast
                </div>
                <div className={styles["movie-detail-page__extra-value"]}>
                  {cast.join(" · ")}
                </div>
              </div>
              <div className={styles["movie-detail-page__extra-block"]}>
                <div className={styles["movie-detail-page__extra-label"]}>
                  Release date
                </div>
                <div className={styles["movie-detail-page__extra-value"]}>
                  {releaseDate}
                </div>
              </div>
              <div className={styles["movie-detail-page__extra-block"]}>
                <div className={styles["movie-detail-page__extra-label"]}>
                  Formats
                </div>
                <div className={styles["movie-detail-page__extra-value"]}>
                  {formatsText}
                </div>
              </div>
            </div>
            <div className={styles["movie-detail-page__trailer"]}>
              <iframe
                src={trailerUrl}
                title={`${title} Trailer`}
                width="100%"
                height="450"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right showtimes */}
          <aside className={styles["movie-detail-page__showtimes"]}>
            <div className={styles["movie-detail-page__showtimes-header"]}>
              <h2 className={styles["movie-detail-page__showtimes-title"]}>
                Showtimes
              </h2>
              <button
                className={`btn btn--primary ${styles["movie-detail-page__buy-button"]}`}
                onClick={() => {
                  const dest = "/booking/tickets";
                  const destState = { movieSlug: slug };
                  if (!user) {
                    navigate("/login", { state: { from: { pathname: dest, state: destState } } });
                  } else {
                    navigate(dest, { state: destState });
                  }
                }}
              >
                Buy tickets
              </button>
            </div>
            <ShowtimeNav />
            <div className={styles.sessionPills}>
              {showtimes.map(({ time, format }, i) => {
                const pillClass =
                  format === "2D"
                    ? styles.pill2d
                    : format === "3D"
                    ? styles.pill3d
                    : styles.pillImax;
                return (
                  <button
                    key={i}
                    className={`${styles.sessionPill} ${pillClass}`}
                    onClick={() => {
                      const dest = "/booking/tickets";
                      const destState = { movieSlug: slug, time, format };
                      if (!user) {
                        navigate("/login", { state: { from: { pathname: dest, state: destState } } });
                      } else {
                        navigate(dest, { state: destState });
                      }
                    }}
                  >
                    <span className={styles.sessionTime}>{time}</span>
                    <span className={styles.sessionFormat}>{format}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      {/* ← Вставлено сюда после закрытия контейнера с контентом */}
      <div className={styles["movie-detail-page__blur-container"]} />
    </div>
  );
}
