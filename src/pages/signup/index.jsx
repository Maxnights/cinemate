import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import styles from "./index.module.css";


export default function SignupPage() {
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple sign up -> log user in
    login({ email }, () => navigate(from, { replace: true }));
  };

  const handleGuest = () => {
    loginAsGuest(() => navigate(from, { replace: true }));
  };

  return (
    <div className={`page ${styles["signup-page"]}`}>
      <h2>Sign Up</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <Input

      <form onSubmit={handleSubmit} className={styles["signup-page__form"]}>
        <input

          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />

        <Button type="submit">Sign Up</Button>

        <button type="submit" className="btn btn--primary">
          Sign Up
        </button>

      </form>
      <button onClick={handleGuest} style={{ marginTop: "8px" }}>
        Continue as guest
      </button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
