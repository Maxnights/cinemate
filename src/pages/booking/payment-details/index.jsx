// src/pages/booking/PaymentDetailsPage.js

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// CSS Module
import styles from "./index.module.css";

/**
 * PaymentDetailsPage — шаг 5 бронирования:
 * - Получает из state предыдущие данные.
 * - Форма: Card number, Expiration date, CVV, чекбокс “Save card”.
 * - Кнопка Continue переводит на /booking/complete с передачей всех данных.
 */
function PaymentDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    tickets,
    accessories,
    totalTicketsCount,
    totalCost,
    selectedSeats,
    cart,
    firstName,
    lastName,
    email,
    phone,
    promoCode,
    ticketsTotal,
    snacksTotal,
    grandTotal,
  } = location.state || {};

  useEffect(() => {
    if (!firstName) {
      navigate("/booking/details");
    }
  }, [firstName, navigate]);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const handleContinue = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all card details.");
      return;
    }
    navigate("/booking/complete", {
      state: {
        tickets,
        accessories,
        totalTicketsCount,
        totalCost,
        selectedSeats,
        cart,
        firstName,
        lastName,
        email,
        phone,
        promoCode,
        ticketsTotal,
        snacksTotal,
        grandTotal,
        cardNumber,
        expiry,
        cvv,
        saveCard,
      },
    });
  };

  return (
    <div className={styles["payment-details"]}>
      <h2 className={styles["payment-details__title"]}>5. Payment</h2>

      <div className={styles["payment-details__form"]}>
        <label className={styles["payment-details__label"]}>
          Card number
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 1234 5678"
            className={styles["payment-details__input"]}
          />
        </label>

        <div className={styles["payment-details__row"]}>
          <label
            className={`${styles["payment-details__label"]} ${styles["payment-details__label--half"]}`}
          >
            Expiration date (MM/YY)
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className={styles["payment-details__input"]}
            />
          </label>

          <label
            className={`${styles["payment-details__label"]} ${styles["payment-details__label--half"]}`}
          >
            CVV (3 digits)
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className={styles["payment-details__input"]}
            />
          </label>
        </div>

        <label className={styles["payment-details__checkbox-label"]}>
          <input
            type="checkbox"
            checked={saveCard}
            onChange={() => setSaveCard((prev) => !prev)}
            className={styles["payment-details__checkbox"]}
          />
          Save card
        </label>
      </div>

      <button
        className={`btn btn--primary ${styles["payment-details__continue"]}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

export default PaymentDetailsPage;
