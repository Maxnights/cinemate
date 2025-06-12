// src/components/Header/Header.js
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./index.module.css";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          Cine<span className={styles["logo--gradient"]}>mate</span>
        </Link>
      <nav className={styles.nav}>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/experience"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Experience
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
        >
          Menu
        </NavLink>
      </nav>
      </div>
      <div className={styles.actions}>
        {user ? (
          <>
            <span className={styles.link}>{user.email}</span>
            <button
              onClick={logout}
              className={`${styles.link} ${styles.buttonLink}`}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Log in
            </Link>
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </>
        )}
        <Link to="/quick-booking" className={styles.quickBooking}>
          Quick booking
        </Link>
      </div>
    </header>
  );
};

export default Header;
