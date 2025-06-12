import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import styles from "./index.module.css";


export default function LoginPage() {
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // fake authentication, store email only
    login({ email }, () => navigate(from, { replace: true }));
  };

  const handleGuest = () => {
    loginAsGuest(() => navigate(from, { replace: true }));
  };

  return (
    <div className={`page ${styles["login-page"]}`}>
      <h2>Login</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <Input

      <form onSubmit={handleSubmit} className={styles["login-page__form"]}>
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

        <Button type="submit">Login</Button>

        <button type="submit" className="btn btn--primary">
          Login
        </button>

      </form>
      <button onClick={handleGuest} style={{ marginTop: "8px" }}>
        Continue as guest
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
