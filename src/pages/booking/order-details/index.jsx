// src/pages/booking/OrderDetailsPage.js

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Подключаем CSS Module
import styles from "./index.module.css";

/**
 * OrderDetailsPage — шаг 4 бронирования:
 * - Получает из state предыдущие данные: tickets, accessories, selectedSeats, cart.
 * - Форма с полями: First name, Last name, Email, Phone.
 * - Отображает итоговый обзор заказа (билеты + аксессуары + выбранные места + закуски).
 * - Поле для ввода промокода (сейчас чисто UI, применения нет).
 * - Кнопка Continue переводит на /booking/payment с передачей всех данных + персональной информации.
 */
function OrderDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Данные из предыдущего шага
  const {
    tickets,
    accessories,
    totalTicketsCount,
    totalCost,
    selectedSeats,
    cart,
  } = location.state || {};

  useEffect(() => {
    if (!selectedSeats) {
      navigate("/booking/snacks");
    }
  }, [selectedSeats, navigate]);

  // Поля формы
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");

  // Итоговые расчёты
  const ticketsTotal = totalCost;
  const snacksTotal = Object.values(cart || {}).reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const grandTotal = ticketsTotal + snacksTotal;

  const handleContinue = () => {
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill all personal details.");
      return;
    }
    navigate("/booking/payment", {
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
      },
    });
  };

  return (
    <div className={styles["order-details"]}>
      <h2 className={styles["order-details__title"]}>4. Your details & Review</h2>

      <div className={styles["order-details__container"]}>
        {/* Левая колонка: форма */}
        <div className={styles["order-details__form"]}>
          <h3 className={styles["order-details__section-title"]}>
            Personal Details
          </h3>
          <label className={styles["order-details__label"]}>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles["order-details__input"]}
            />
          </label>
          <label className={styles["order-details__label"]}>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles["order-details__input"]}
            />
          </label>
          <label className={styles["order-details__label"]}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["order-details__input"]}
            />
          </label>
          <label className={styles["order-details__label"]}>
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles["order-details__input"]}
            />
          </label>
          <label className={styles["order-details__label"]}>
            Promo Code
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className={styles["order-details__input"]}
              placeholder="Have a voucher code? Add it here."
            />
          </label>
        </div>

        {/* Правая колонка: обзор заказа */}
        <div className={styles["order-details__review"]}>
          <h3 className={styles["order-details__section-title"]}>
            Order Details
          </h3>

          {/* Билеты и аксессуары */}
          <div className={styles["order-details__review-block"]}>
            <span className={styles["order-details__review-label"]}>Tickets:</span>
            <ul className={styles["order-details__review-list"]}>
              {Object.entries(tickets || {}).map(([category, count]) =>
                count > 0 ? (
                  <li key={category}>
                    {category} x {count} (€{(PRICES[category] * count).toFixed(2)})
                  </li>
                ) : null
              )}
            </ul>
            {accessories?.["3D glasses"] > 0 && (
              <p>
                3D glasses x {accessories["3D glasses"]} (€
                {(accessories["3D glasses"] * 1.5).toFixed(2)})
              </p>
            )}
          </div>

          {/* Места */}
          <div className={styles["order-details__review-block"]}>
            <span className={styles["order-details__review-label"]}>Seats:</span>
            <p>{selectedSeats.join(", ")}</p>
          </div>

          {/* Закуски */}
          {Object.keys(cart || {}).length > 0 && (
            <div className={styles["order-details__review-block"]}>
              <span className={styles["order-details__review-label"]}>Snacks:</span>
              <ul className={styles["order-details__review-list"]}>
                {Object.entries(cart).map(([id, item]) => (
                  <li key={id}>
                    {item.name} ({item.size}) x {item.count} (€
                    {(item.price * item.count).toFixed(2)})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Промокод */}
          {promoCode && (
            <div className={styles["order-details__review-block"]}>
              <span className={styles["order-details__review-label"]}>
                Promo Code:
              </span>
              <p>{promoCode}</p>
            </div>
          )}

          {/* Итог */}
          <div
            className={`${styles["order-details__review-block"]} ${styles["order-details__review-total"]}`}
          >
            <span className={styles["order-details__review-label"]}>
              Total to pay:
            </span>
            <span className={styles["order-details__review-value"]}>
              €{grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        className={`btn btn--primary ${styles["order-details__continue"]}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

// Цены для обзора (как в TicketSelection)
const PRICES = {
  Adult: 6.0,
  Student: 5.0,
  Child: 4.0,
  Senior: 4.0,
};

export default OrderDetailsPage;
