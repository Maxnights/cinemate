/*  src/pages/booking/SeatSelection/index.jsx  */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { rows, cols, takenSeats } from '../../../data/seats';
import styles from './index.module.css';

/**
 * SeatSelection — step 2 of booking:
 * — draw seat grid, let user pick exactly totalTicketsCount seats
 * — forwards state to /booking/snacks
 */
export default function SeatSelection() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* props from previous page */
  const {
    tickets,
    accessories,
    totalTicketsCount,
    totalCost,
  } = state || {};

  /* guard: if user lands directly, send back */
  useEffect(() => {
    if (!tickets || totalTicketsCount === undefined) {
      navigate('/booking/tickets');
    }
  }, [tickets, totalTicketsCount, navigate]);

  /* local state: selected seat IDs like ['A5', 'C3'] */
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    /* limit to exactly totalTicketsCount seats */
    if (
      selectedSeats.length >= totalTicketsCount &&
      !selectedSeats.includes(seatId)
    )
      return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length !== totalTicketsCount) {
      alert(`Please select ${totalTicketsCount} seats.`);
      return;
    }
    navigate('/booking/snacks', {
      state: {
        tickets,
        accessories,
        totalTicketsCount,
        totalCost,
        selectedSeats,
      },
    });
  };

  /* helpers */
  const seatCls = (taken, selected) =>
    `${styles.seat} ${
      taken ? styles.taken : selected ? styles.selected : styles.available
    }`;

  /* UI */
  return (
    <div className={styles['seat-selection']}>
      <h2 className={styles['seat-selection__title']}>
        2.&nbsp;Select Seats
      </h2>

      <p className={styles['seat-selection__subtitle']}>
        {/* e.g. showtime details could go here */}
      </p>

      <div className={styles['seat-selection__screen']}>Screen&nbsp;6</div>

      {/* seat grid */}
      <div className={styles['seat-selection__grid']}>
        {rows.map((row) => (
          <div key={row} className={styles['seat-selection__row']}>
            <div className={styles['seat-selection__row-label']}>{row}</div>

            {Array.from({ length: cols }, (_, i) => i + 1).map((col) => {
              const seatId = `${row}${col}`;
              const taken = takenSeats.includes(seatId);
              const selected = selectedSeats.includes(seatId);

              return (
                <div
                  key={seatId}
                  className={seatCls(taken, selected)}
                  onClick={() => !taken && toggleSeat(seatId)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles['seat-selection__selected-info']}>
        Selected seats:&nbsp;
        {selectedSeats.length ? selectedSeats.join(', ') : 'None'}
      </div>

      <button
        className={`btn btn--primary ${styles['seat-selection__continue']}`}
        onClick={handleContinue}
        disabled={selectedSeats.length !== totalTicketsCount}
      >
        Continue
      </button>
    </div>
  );
}
