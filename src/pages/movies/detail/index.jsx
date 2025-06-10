// src/pages/MovieDetailPage.js

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moviesData from "../../../data/movies";
import ShowtimeNav from "../../../components/movies/ShowtimeNav";
import styles from "./index.module.css";

export default function MovieDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Ищем фильм по slug
  const movie = moviesData.find((m) => m.slug === slug);
  if (!movie) {
    return (
      <div className={`page ${styles["movie-detail-page"]} movie-detail-page--notfound`}>
        <p>Movie not found.</p>
        <Link to="/movies" className="btn btn--primary">
          Back to All Movies
        </Link>
      </div>
    );
  }

  const {
    title,
    gallery,
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
  } = movie;

  const genresText = genres.join(" · ");
  const formatsText = formats.join(", ");

  return (
    <div className={`page ${styles["movie-detail-page"]}`}>
      <div className={styles["movie-detail-page__container"]}>
        {/* Breadcrumbs */}
        <nav className={styles["movie-detail-page__breadcrumbs"]}>
          <Link to="/" className={styles["movie-detail-page__breadcrumb-link"]}>
            Home
          </Link>
          <span className={styles["movie-detail-page__breadcrumb-separator"]}>›</span>
          <Link to="/movies" className={styles["movie-detail-page__breadcrumb-link"]}>
            Movies
          </Link>
          <span className={styles["movie-detail-page__breadcrumb-separator"]}>›</span>
          <span className={styles["movie-detail-page__breadcrumb-current"]}>
            {title}
          </span>
        </nav>

        {/* Gallery */}
        <div className={styles["movie-detail-page__gallery"]}>
          {(gallery || []).length > 0 ? (
            gallery.map((imgUrl, idx) => (
              <div key={idx} className={styles["movie-detail-page__gallery-item"]}>
                <img
                  src={imgUrl}
                  alt={`${title} screenshot ${idx + 1}`}
                  className={styles["movie-detail-page__gallery-image"]}
                />
              </div>
            ))
          ) : (
            <div className={styles["movie-detail-page__gallery-item"]}>
              <img
                src={poster}
                alt={title}
                className={styles["movie-detail-page__gallery-image"]}
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles["movie-detail-page__info"]}>
          <h1 className={styles["movie-detail-page__title"]}>{title}</h1>
          <p className={styles["movie-detail-page__meta"]}>
            {genresText} · {duration} ·{" "}
            <span className="rating-badge">{rating}</span>
          </p>
          <p className={styles["movie-detail-page__lang-sub"]}>
            {language} · {subtitles}
          </p>
          <p className={styles["movie-detail-page__synopsis"]}>{synopsis}</p>

          <div className={styles["movie-detail-page__extra"]}>
            <div className={styles["movie-detail-page__extra-block"]}>
              <span className={styles["movie-detail-page__extra-label"]}>
                Director:
              </span>{" "}
              <span className={styles["movie-detail-page__extra-value"]}>
                {director}
              </span>
            </div>
            <div className={styles["movie-detail-page__extra-block"]}>
              <span className={styles["movie-detail-page__extra-label"]}>
                Cast:
              </span>{" "}
              <span className={styles["movie-detail-page__extra-value"]}>
                {cast.join(", ")}
              </span>
            </div>
            <div className={styles["movie-detail-page__extra-block"]}>
              <span className={styles["movie-detail-page__extra-label"]}>
                Release date:
              </span>{" "}
              <span className={styles["movie-detail-page__extra-value"]}>
                {releaseDate}
              </span>
            </div>
            <div className={styles["movie-detail-page__extra-block"]}>
              <span className={styles["movie-detail-page__extra-label"]}>
                Formats:
              </span>{" "}
              <span className={styles["movie-detail-page__extra-value"]}>
                {formatsText}
              </span>
            </div>
          </div>
        </div>

        {/* Showtimes */}
        <div className={styles["movie-detail-page__showtimes"]}>
          <div className={styles["movie-detail-page__showtimes-header"]}>
            <h2 className={styles["movie-detail-page__showtimes-title"]}>
              Showtimes
            </h2>
            <button
              className={`btn btn--primary ${styles["movie-detail-page__buy-button"]}`}
              onClick={() =>
                navigate("/booking/tickets", { state: { movieSlug: slug } })
              }
            >
              Buy tickets
            </button>
          </div>
          <ShowtimeNav />
        </div>
      </div>
    </div>
  );
}
