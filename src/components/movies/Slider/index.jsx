/*  src/components/movies/Slider/index.jsx  */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SlickSlider from 'react-slick';
import moviesData from '../../../data/movies';
import styles from './index.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slider() {
  const navigate = useNavigate();

  /* custom arrows have to see `styles`, поэтому объявляем их внутри */
  const PrevArrow = ({ onClick }) => (
    <button
      className={`${styles['custom-arrow']} ${styles['custom-prev']}`}
      onClick={onClick}
      aria-label="Previous"
    >
      ‹
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className={`${styles['custom-arrow']} ${styles['custom-next']}`}
      onClick={onClick}
      aria-label="Next"
    >
      ›
    </button>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '20%',
    dots: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: () => <div className={styles['slick-dot']} />,
    appendDots: (dots) => (
      <ul className={styles['slick-dots']}>{dots}</ul>
    ),
    responsive: [
      { breakpoint: 1200, settings: { centerPadding: '15%' } },
      { breakpoint: 768,  settings: { centerPadding: '10%' } },
      { breakpoint: 480,  settings: { centerPadding: '5%' } },
    ],
  };

  return (
    <div className={styles['slider-wrapper']}>
      <SlickSlider {...settings} className={styles.slider}>
        {moviesData.slice(0, 5).map((movie) => (
          <div key={movie.id} className={styles.slide}>
            <div className={styles['slide__image-container']}>
              <img
                src={movie.poster}
                alt={movie.title}
                className={styles['slide__image']}
              />

              <div className={styles['slide__overlay']} />

              <div className={styles['slide__text']}>
                <p className={styles['slide__meta']}>
                  {movie.genres.join(' · ')} · {movie.duration} ·{' '}
                  <span className={styles['rating-badge']}>
                    {movie.rating}
                  </span>
                </p>

                <h3 className={styles['slide__title']}>{movie.title}</h3>

                <button
                  className={styles['slide__buy-button']}
                  onClick={() => navigate(`/movies/${movie.slug}`)}
                >
                  Buy tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
}
