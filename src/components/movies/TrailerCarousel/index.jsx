// src/components/TrailerCarousel/TrailerCarousel.jsx
import React, {
  useState,
  useCallback,
  memo,
  lazy,
  Suspense,
  useMemo,
} from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import movies from "../../../data/movies";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./index.module.css";

// Ленивый плеер
const ReactPlayer = lazy(() => import("react-player"));

// Кастомная стрелка
const Arrow = memo(({ dir, onClick }) => (
  <button
    type="button"
    aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
    className={`${styles.customArrow} ${
      dir === "prev" ? styles.customPrev : styles.customNext
    }`}
    onClick={onClick}
  >
    {dir === "prev" ? "‹" : "›"}
  </button>
));

const Slide = memo(({ movie, isPlaying, onPlay }) => (
  <div>
    <div className={styles.playerWrapper}>
      {!isPlaying && movie.logo && (
        <img
          src={movie.logo}
          alt={`${movie.title} logo`}
          className={styles.logo}
        />
      )}
      <Suspense fallback={<div className={styles.loader}>Loading…</div>}>
        <ReactPlayer
          url={movie.trailerUrl}
          light={movie.previewUrl}
          playing={isPlaying}
          playIcon={
            <button className={styles.customPlayButton} onClick={onPlay}>
              <span className={styles.playIconSymbol}>▶</span>
            </button>
          }
          width="100%"
          height="100%"
          controls
        />
      </Suspense>
    </div>

    {!isPlaying && (
      <div className={styles.infoOverlay}>
        <h2>{movie.title}</h2>
        <p>
          {movie.genres.join(" • ")} • {movie.duration} • {movie.rating}
        </p>
        <p>{movie.synopsis}</p>
        <Link to={`/movies/${movie.slug}`} className={styles.btnBuy}>
          Buy tickets
        </Link>
      </div>
    )}
  </div>
));

export default function TrailerCarousel() {
  const [playingId, setPlayingId] = useState(null);
  const handlePlay = useCallback((id) => setPlayingId(id), []);
  const stopAll = useCallback(() => setPlayingId(null), []);

  const slickSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      prevArrow: <Arrow dir="prev" />,
      nextArrow: <Arrow dir="next" />,
      beforeChange: stopAll,
    }),
    [stopAll]
  );

  return (
    <section className={styles.trailerCarousel}>
      <div className="container">
        <div className={styles.carouselContainer}>
          <Slider {...slickSettings}>
            {movies.map((movie) => (
              <Slide
                key={movie.id}
                movie={movie}
                isPlaying={playingId === movie.id}
                onPlay={() => handlePlay(movie.id)}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
