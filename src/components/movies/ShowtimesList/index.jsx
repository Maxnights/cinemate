/*  src/components/movies/ShowtimesList/index.jsx  */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movies from '../../../data/movies';
import styles from './index.module.css';

export default function ShowtimesList() {
  const navigate = useNavigate();
  const [activeTrailer, setActiveTrailer] = useState(null);

  return (
    <section className={styles['showtimes-section']}>
      {/* limited-width container */}
      <div className={styles['showtimes-container']}>
        <div className={styles['showtimes-list']}>
          {movies.map((m) => (
            <div key={m.id} className={styles['showtimes-list__item']}>
              {/* ─── Poster + play ─── */}
              <div className={styles['showtimes-list__poster']}>
                <img src={m.cover} alt={m.title} />
                {m.trailerUrl && (
                  <button
                    className={styles['showtimes-list__play']}
                    onClick={() => setActiveTrailer(m.trailerUrl)}
                    aria-label={`Play trailer for ${m.title}`}
                  >
                    ▶
                  </button>
                )}
              </div>

              {/* ─── Content ─── */}
              <div className={styles['showtimes-list__content']}>
                <div className={styles['showtimes-list__header']}>
                  <span className={styles.genres}>
                    {m.genres.join(' · ')}
                  </span>

                  <h3 className={styles.title}>{m.title}</h3>

                  <span className={styles.meta}>
                    {m.duration} ·{' '}
                    <span className={styles['rating-badge']}>{m.rating}</span>
                  </span>
                </div>

                {m.synopsis && (
                  <p className={styles.desc}>{m.synopsis}</p>
                )}

                <a
                  href={`/movies/${m.slug}`}
                  className={styles['details-link']}
                >
                  See full details{' '}
                  <span className={styles.arrow}>›</span>
                </a>

                <div className={styles['showtimes-list__times']}>
                  {(m.showtimes || []).map(({ time, format }) => (
                    <button
                      key={`${time}-${format}`}
                      className={`${styles['showtime-pill']} ${
                        styles[`format-${format.toLowerCase()}`]
                      }`}
                      onClick={() =>
                        navigate('/booking/tickets', {
                          state: { movieSlug: m.slug, time, format },
                        })
                      }
                    >
                      <span className={styles['pill__time']}>{time}</span>
                      <span className={styles['pill__format']}>
                        {format}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Trailer modal ─── */}
      {activeTrailer && (
        <div
          className={styles['trailer-modal']}
          onClick={() => setActiveTrailer(null)}
        >
          <div
            className={styles['trailer-modal__content']}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles['trailer-modal__close']}
              onClick={() => setActiveTrailer(null)}
              aria-label="Close trailer"
            >
              ✕
            </button>

            <iframe
              className={styles['trailer-modal__iframe']}
              src={activeTrailer}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
