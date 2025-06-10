// src/pages/BookingPage.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TicketSelection from "../../components/booking/TicketSelection";
import SeatSelection from "../../components/booking/SeatSelection";
import SnacksPage from "./snacks";
import OrderDetailsPage from "./order-details";
import PaymentDetailsPage from "./payment-details";
import OrderCompletionPage from "./complete";

import styles from "./index.module.css";

function BookingPage() {
  return (
    <div className={styles["booking-page"]}>
      <div className={styles["booking-page__container"]}>
        <Routes>
          <Route index element={<Navigate to="tickets" replace />} />

          <Route path="tickets" element={<TicketSelection />} />
          <Route path="seats" element={<SeatSelection />} />
          <Route path="snacks" element={<SnacksPage />} />
          <Route path="details" element={<OrderDetailsPage />} />
          <Route path="payment" element={<PaymentDetailsPage />} />
          <Route path="complete" element={<OrderCompletionPage />} />

          <Route path="*" element={<Navigate to="tickets" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default BookingPage;
