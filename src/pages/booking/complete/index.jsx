// src/pages/booking/OrderCompletionPage.js

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

// Подключаем CSS Module
import styles from "./index.module.css";

/**
 * OrderCompletionPage — шаг 6 бронирования:
 * - Получает из state все данные: персональные, билеты, места, закуски и т. д.
 * - Отображает QR-код (на основе сгенерированного уникального токена).
 * - Показывает обзор покупки: билеты, места, закуски.
 * - Отсчёт времени до начала сеанса.
 * - Кнопка «Add to calendar».
 */
function OrderCompletionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Достаём из state все данные
  const {
    selectedSeats,
    cart,
    cardNumber,
  } = location.state || {};

  // Если данных о карте нет (пользователь обошёл шаг оплаты), редирект
  useEffect(() => {
    if (!cardNumber) {
      navigate("/booking/payment");
    }
  }, [cardNumber, navigate]);

  // Генерация токена для QR-кода
  const [ticketToken] = useState(() =>
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );

  // Сеанс через 2 часа от now
  const showtimeDate = new Date();
  showtimeDate.setHours(showtimeDate.getHours() + 2);

  const calculateTimeLeft = () => {
    const diff = showtimeDate - new Date();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles["order-completion"]}>
      <h2 className={styles["order-completion__title"]}>Payment Successful</h2>
      <p className={styles["order-completion__subtitle"]}>
        Thank you for purchasing tickets online. We look forward to welcoming
        you at the cinema and hope you have a great time with us.
      </p>

      <div className={styles["order-completion__ticket"]}>
        <h3 className={styles["order-completion__ticket-title"]}>
          Ticket for entering &amp; food pickup
        </h3>
        <div className={styles["order-completion__qr"]}>
          <QRCodeCanvas value={ticketToken} size={180} fgColor="#222" />
          <p className={styles["order-completion__qr-text"]}>{ticketToken}</p>
        </div>
        <p className={styles["order-completion__screen"]}>Screen: 6</p>
        <p className={styles["order-completion__seats"]}>
          Seats: {selectedSeats?.join(", ")}
        </p>
        <Link to="/movies" className={styles["order-completion__swap"]}>
          Swap seats
        </Link>
      </div>

      <div className={styles["order-completion__pickup-overview"]}>
        <h3 className={styles["order-completion__section-title"]}>
          Pickup order overview
        </h3>
        {Object.values(cart || {}).length > 0 ? (
          <ul className={styles["order-completion__pickup-list"]}>
            {Object.entries(cart).map(([id, item]) => (
              <li key={id}>
                {item.name} ({item.size}) x {item.count}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles["order-completion__pickup-empty"]}>
            No snacks ordered.
          </p>
        )}
        <Link to="/booking/snacks" className={styles["order-completion__pickup-edit"]}>
          Make changes
        </Link>
      </div>

      <div className={styles["order-completion__timer"]}>
        <h3 className={styles["order-completion__section-title"]}>
          Movie starts in
        </h3>
        <div className={styles["order-completion__countdown"]}>
          <div className={styles["order-completion__countdown-item"]}>
            <span className={styles["order-completion__countdown-value"]}>
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className={styles["order-completion__countdown-label"]}>
              Hours
            </span>
          </div>
          <span className={styles["order-completion__colon"]}>:</span>
          <div className={styles["order-completion__countdown-item"]}>
            <span className={styles["order-completion__countdown-value"]}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className={styles["order-completion__countdown-label"]}>
              Minutes
            </span>
          </div>
          <span className={styles["order-completion__colon"]}>:</span>
          <div className={styles["order-completion__countdown-item"]}>
            <span className={styles["order-completion__countdown-value"]}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className={styles["order-completion__countdown-label"]}>
              Seconds
            </span>
          </div>
        </div>
        <button
          className={`btn btn--secondary ${styles["order-completion__add-calendar"]}`}
        >
          Add to calendar
        </button>
      </div>
    </div>
  );
}

export default OrderCompletionPage;
