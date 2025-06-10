// src/pages/booking/SnacksPage.js

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import snacksData from "../../../data/snacks";
import styles from "./index.module.css";

/**
 * SnacksPage — шаг 3 бронирования:
 * - Показывает список закусок из snacksData (категории Popcorn & Nachos, Drinks и т. д.).
 * - При клике открывает модалку с деталями (описание, размеры, калории, цены).
 * - Можно выбрать количество (по умолчанию 1) и размер, после чего добавить в корзину.
 * - Внизу экрана отображается текущая стоимость заказа.
 * - Кнопка Continue переводит на /booking/details с передачей всех данных.
 */
function SnacksPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Достаём из state предыдущие шаги:
  const { tickets, accessories, totalTicketsCount, totalCost, selectedSeats } =
    location.state || {};

  // Если нет частей состояния, возвращаем на /booking/seats
  useEffect(() => {
    if (!selectedSeats) {
      navigate("/booking/seats");
    }
  }, [selectedSeats, navigate]);

  // Состояние “корзины” закусок
  const [cart, setCart] = useState({});

  // Состояние показа модалки (детали товара)
  const [modalSnack, setModalSnack] = useState(null);

  // Открыть модалку для конкретного товара
  const openModal = (snack) => {
    setModalSnack({ ...snack, selectedSize: snack.sizes[0].size, count: 1 });
  };

  // Закрыть модалку
  const closeModal = () => {
    setModalSnack(null);
  };

  // Изменить выбранный размер (внутри модалки)
  const handleSizeChange = (size) => {
    setModalSnack((prev) => ({ ...prev, selectedSize: size }));
  };

  // Изменить количество (count) внутри модалки
  const handleCountChange = (delta) => {
    setModalSnack((prev) => {
      const newCount = Math.max(1, prev.count + delta);
      return { ...prev, count: newCount };
    });
  };

  // Добавить товар из модалки в корзину
  const handleAddToCart = () => {
    const { id, selectedSize, count, sizes, name, imageUrl } = modalSnack;
    const sizeObj = sizes.find((s) => s.size === selectedSize);
    if (!sizeObj) return;

    setCart((prev) => ({
      ...prev,
      [id]: {
        ...sizeObj,
        count,
        name,
        imageUrl,
      },
    }));
    closeModal();
  };

  // Удалить из корзины
  const removeFromCart = (snackId) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[snackId];
      return updated;
    });
  };

  // Общая стоимость корзины
  const cartTotal = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  // Общая стоимость всего заказа (билеты + аксессуары + закуски)
  const grandTotal = totalCost + cartTotal;

  // Продолжить → OrderDetails
  const handleContinue = () => {
    navigate("/booking/details", {
      state: {
        tickets,
        accessories,
        totalTicketsCount,
        totalCost,
        selectedSeats,
        cart,
      },
    });
  };

  // Группируем по категориям
  const categories = [...new Set(snacksData.map((item) => item.category))];

  return (
    <div className={styles["snacks-page"]}>
      <h2 className={styles["snacks-page__title"]}>3. Snacks & Drinks</h2>

      {categories.map((cat) => (
        <div key={cat} className={styles["snacks-page__category"]}>
          <h3 className={styles["snacks-page__category-title"]}>{cat}</h3>
          <div className={styles["snacks-page__items"]}>
            {snacksData
              .filter((item) => item.category === cat)
              .map((snack) => (
                <div
                  key={snack.id}
                  className={styles["snacks-page__item"]}
                  onClick={() => openModal(snack)}
                >
                  <img
                    src={snack.imageUrl}
                    alt={snack.name}
                    className={styles["snacks-page__item-image"]}
                  />
                  <div className={styles["snacks-page__item-info"]}>
                    <p className={styles["snacks-page__item-name"]}>
                      {snack.name}
                    </p>
                    <p className={styles["snacks-page__item-price"]}>
                      €{snack.sizes[0].price.toFixed(2)} – €
                      {snack.sizes.at(-1).price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {modalSnack && (
        <div
          className={styles["snacks-page__modal-backdrop"]}
          onClick={closeModal}
        >
          <div
            className={styles["snacks-page__modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalSnack.imageUrl}
              alt={modalSnack.name}
              className={styles["snacks-page__modal-image"]}
            />
            <h3 className={styles["snacks-page__modal-name"]}>
              {modalSnack.name}
            </h3>
            <p className={styles["snacks-page__modal-desc"]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div className={styles["snacks-page__modal-sizes"]}>
              {modalSnack.sizes.map((sz) => (
                <button
                  key={sz.size}
                  className={`${styles["snacks-page__modal-size-btn"]} ${
                    modalSnack.selectedSize === sz.size ? "active" : ""
                  }`}
                  onClick={() => handleSizeChange(sz.size)}
                >
                  {sz.size} ({sz.calories})
                </button>
              ))}
            </div>

            <div className={styles["snacks-page__modal-footer"]}>
              <div className={styles["snacks-page__modal-counter"]}>
                <button
                  className={styles["snacks-page__modal-counter-btn"]}
                  onClick={() => handleCountChange(-1)}
                >
                  –
                </button>
                <span className={styles["snacks-page__modal-counter-value"]}>
                  {modalSnack.count}
                </span>
                <button
                  className={styles["snacks-page__modal-counter-btn"]}
                  onClick={() => handleCountChange(+1)}
                >
                  +
                </button>
              </div>
              <button
                className={`btn btn--primary ${styles["snacks-page__modal-add-btn"]}`}
                onClick={handleAddToCart}
              >
                Add to cart (€
                {(
                  modalSnack.sizes.find(
                    (s) => s.size === modalSnack.selectedSize
                  ).price * modalSnack.count
                ).toFixed(2)}
                )
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles["snacks-page__summary"]}>
        <span className={styles["snacks-page__summary-label"]}>Cart total:</span>
        <span className={styles["snacks-page__summary-value"]}>
          €{cartTotal.toFixed(2)}
        </span>
        <span className={styles["snacks-page__summary-label"]}>
          Booking total:
        </span>
        <span className={styles["snacks-page__summary-value"]}>
          €{grandTotal.toFixed(2)}
        </span>
      </div>

      {Object.keys(cart).length > 0 && (
        <div className={styles["snacks-page__cart-list"]}>
          <h4>Your selections:</h4>
          {Object.entries(cart).map(([id, item]) => (
            <div key={id} className={styles["snacks-page__cart-item"]}>
              <span className={styles["snacks-page__cart-item-name"]}>
                {item.name} ({item.size}) x {item.count}
              </span>
              <span className={styles["snacks-page__cart-item-price"]}>
                €{(item.price * item.count).toFixed(2)}
              </span>
              <button
                className={styles["snacks-page__cart-item-remove"]}
                onClick={() => removeFromCart(id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className={`btn btn--primary ${styles["snacks-page__continue"]}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

export default SnacksPage;
