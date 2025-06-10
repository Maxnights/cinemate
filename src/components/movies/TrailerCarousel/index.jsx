import React, { useState } from "react";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import moviesData from "../../../data/movies";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TrailerCarousel() {
  const [playingId, setPlayingId] = useState(null);

  const PrevArrow = ({ onClick }) => (
    <button className={`${styles.customArrow} ${styles.customPrev}`} onClick={onClick}>
      ‹
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className={`${styles.customArrow} ${styles.customNext}`} onClick={onClick}>
      ›
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: () => setPlayingId(null),
  };

  const logoContext = require.context(
    '../../../assets/images/logos',  
    false,                       
    /\.png$/                         
  );

  const logoMap = logoContext.keys().reduce((acc, path) => {
    acc[path.replace('./', '')] = logoContext(path).default;
    return acc;
  }, {});


  return (
    <div className={styles.trailerCarousel}>
      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {moviesData.map((movie) => {
            const logoSrc = logoMap[`${movie.slug}.png`];  

            const handlePlayClick = () => setPlayingId(movie.id);

            return (
              <div key={movie.id} className={styles.slide}>
                <div className={styles.playerWrapper}>
                  {logoSrc && playingId !== movie.id && (
                    <img
                      src={logoSrc}
                      alt={`${movie.title} Logo`}
                      className={styles.logoOverlay}
                    />
                  )}

                  <ReactPlayer
                    url={movie.trailerUrl}
                    light={movie.previewUrl}
                    playing={playingId === movie.id}
                    playIcon={
                      <button
                        className={styles.customPlayButton}
                        onClick={handlePlayClick}
                      >
                        ▶
                      </button>
                    }
                    width="100%"
                    height="100%"
                    controls
                    onStart={() => setPlayingId(movie.id)}
                  />
                </div>

                {playingId !== movie.id && (
                  <div className={styles.logoInfo}>
                    <div className={styles.logoInfoMeta}>
                      <span>{movie.genres.join(" • ")}</span>
                      <span className={styles.logoInfoSep}>•</span>
                      <span>{movie.duration}</span>
                      <span className={styles.logoInfoSep}>•</span>
                      <span className={styles.logoInfoRating}>{movie.rating}</span>
                    </div>
                    <p className={styles.logoInfoDescription}>{movie.synopsis}</p>
                    <Link to={`/movies/${movie.slug}`} className={styles.buy}>
                      Buy tickets
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
