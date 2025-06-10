/*  src/pages/booking/TicketSelection/index.jsx  */
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moviesData from '../../../data/movies';
import styles from './index.module.css';

/**
 * TicketSelection — step 1 of booking flow
 * — choose ticket counts + accessories, show running total
 * — on Continue forwards state to /booking/seats
 */
export default function TicketSelection() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const movieSlug = state?.movieSlug;

  /* fetch movie title from dataset */
  const [movieTitle, setMovieTitle] = useState('');
  useEffect(() => {
    if (movieSlug) {
      const found = moviesData.find((m) => m.slug === movieSlug);
      if (found) setMovieTitle(found.title);
    }
  }, [movieSlug]);

  /* prices */
  const PRICES = { Adult: 6, Student: 5, Child: 4, Senior: 4 };
  const ACCESSORY_PRICE = 1.5;

  /* state: ticket counts + accessories */
  const [tickets, setTickets] = useState({
    Adult: 0,
    Student: 0,
    Child: 0,
    Senior: 0,
  });
  const [accessories, setAccessories] = useState({ '3D glasses': 0 });

  /* derived totals */
  const ticketsTotal = useMemo(
    () =>
      Object.entries(tickets).reduce(
        (sum, [cat, cnt]) => sum + PRICES[cat] * cnt,
        0
      ),
    [tickets]
  );

  const accessoriesTotal = useMemo(
    () =>
      Object.values(accessories).reduce(
        (sum, cnt) => sum + ACCESSORY_PRICE * cnt,
        0
      ),
    [accessories]
  );

  const totalCost = ticketsTotal + accessoriesTotal;
  const totalTicketsCount = useMemo(
    () => Object.values(tickets).reduce((s, c) => s + c, 0),
    [tickets]
  );

  /* handlers */
  const inc = (objSetter) => (key, delta) =>
    objSetter((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));

  const handleTicketChange = inc(setTickets);
  const handleAccessoryChange = inc(setAccessories);

  const handleContinue = () => {
    if (totalTicketsCount === 0) {
      alert('Please select at least one ticket.');
      return;
    }
    navigate('/booking/seats', {
      state: {
        tickets,
        accessories,
        totalTicketsCount,
        totalCost,
        movieSlug,
        movieTitle,
      },
    });
  };

  /* ui */
  return (
    <div className={styles['ticket-selection']}>
      <h2 className={styles['ticket-selection__title']}>
        1.&nbsp;Select Tickets
        {movieTitle && ` for ${movieTitle}`}
      </h2>

      <div className={styles['ticket-selection__lists']}>
        {/* Ticket categories */}
        <div className={styles['ticket-selection__list']}>
          <h3 className={styles['ticket-selection__list-title']}>
            Ticket types
          </h3>
          {Object.keys(PRICES).map((cat) => (
            <div
              key={cat}
              className={styles['ticket-selection__item']}
            >
              <span className={styles['ticket-selection__item-label']}>
                {cat} (€{PRICES[cat].toFixed(2)})
              </span>

              <div className={styles['ticket-selection__counter']}>
                <button
                  className={styles['ticket-selection__counter-btn']}
                  onClick={() => handleTicketChange(cat, -1)}
                >
                  –
                </button>
                <span
                  className={styles['ticket-selection__counter-value']}
                >
                  {tickets[cat]}
                </span>
                <button
                  className={styles['ticket-selection__counter-btn']}
                  onClick={() => handleTicketChange(cat, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Accessories */}
        <div className={styles['ticket-selection__list']}>
          <h3 className={styles['ticket-selection__list-title']}>
            Accessories
          </h3>
          {Object.keys(accessories).map((item) => (
            <div
              key={item}
              className={styles['ticket-selection__item']}
            >
              <span className={styles['ticket-selection__item-label']}>
                {item} (€{ACCESSORY_PRICE.toFixed(2)})
              </span>

              <div className={styles['ticket-selection__counter']}>
                <button
                  className={styles['ticket-selection__counter-btn']}
                  onClick={() => handleAccessoryChange(item, -1)}
                >
                  –
                </button>
                <span
                  className={styles['ticket-selection__counter-value']}
                >
                  {accessories[item]}
                </span>
                <button
                  className={styles['ticket-selection__counter-btn']}
                  onClick={() => handleAccessoryChange(item, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* total */}
      <div className={styles['ticket-selection__summary']}>
        <span className={styles['ticket-selection__summary-label']}>
          Total:
        </span>
        <span className={styles['ticket-selection__summary-value']}>
          €{totalCost.toFixed(2)}
        </span>
      </div>

      <button
        className={`btn btn--primary ${styles['ticket-selection__continue']}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
