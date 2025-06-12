import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './index.module.css';

export default function LoginPage() {
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
    <div className={styles['login-page']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2 className={styles['login-form__title']}>Log In</h2>
        <label className={styles['login-form__label']}>
          Email
          <input
            className={styles['login-form__input']}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={styles['login-form__label']}>
          Password
          <input
            className={styles['login-form__input']}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles['login-form__submit']}>
          Log In
        </button>
      </form>
    </div>
  );
}
