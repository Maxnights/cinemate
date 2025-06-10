/*  src/components/movies/MovieCard/index.jsx  */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function MovieCard({ movie }) {
  const genresText = movie.genres.join(' · ');

  return (
    <Link
      to={`/movies/${movie.slug}`}
      className={styles['movie-card-link']}         
    >
      <div className={styles['movie-card']}>       
        <img
          src={movie.poster}
          alt={movie.title}
          className={styles['movie-card__poster']}
        />

        <div className={styles['movie-card__overlay']} />

        <div className={styles['movie-card__info']}>
          <h3 className={styles['movie-card__title']}>{movie.title}</h3>
          <p className={styles['movie-card__genres']}>{genresText}</p>
        </div>
      </div>
    </Link>
  );
}
