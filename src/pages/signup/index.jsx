import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './index.module.css';

export default function SignUpPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className={styles['signup-page']}>
      <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <h2 className={styles['signup-form__title']}>Sign Up</h2>
        <label className={styles['signup-form__label']}>
          Email
          <input
            className={styles['signup-form__input']}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={styles['signup-form__label']}>
          Password
          <input
            className={styles['signup-form__input']}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles['signup-form__submit']}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
