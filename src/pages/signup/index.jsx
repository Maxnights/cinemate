import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./index.module.css";

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, name });
    navigate(from, { replace: true, state: location.state?.from?.state });
  };

  return (
    <div className={styles["auth-page"]}>
      <form className={styles["auth-form"]} onSubmit={handleSubmit}>
        <h2 className={styles["auth-title"]}>Sign up</h2>
        <label className={styles["auth-label"]}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles["auth-input"]}
            required
          />
        </label>
        <label className={styles["auth-label"]}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["auth-input"]}
            required
          />
        </label>
        <label className={styles["auth-label"]}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["auth-input"]}
            required
          />
        </label>
        <button type="submit" className={`btn btn--primary ${styles["auth-button"]}`}>
          Sign up
        </button>
        <Link to="/login" className={styles["auth-link"]}>
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
}
