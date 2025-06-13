// src/pages/NotFoundPage.js

import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function NotFoundPage() {
  return (
    <div className={`page not-found-page ${styles["not-found-page"]}`}>
      <h2>404 — Страница не найдена</h2>
      <p>К сожалению, такой страницы не существует.</p>
      <p>
        <Link to="/" style={{ color: "var(--color-primary)" }}>
          Вернуться на главную
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
