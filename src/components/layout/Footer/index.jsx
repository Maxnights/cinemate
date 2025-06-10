/*  src/components/layout/Footer/index.jsx  */
import React from 'react';
import styles from './index.module.css';

import { ReactComponent as FacebookIcon } from '../../../assets/svgs/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/svgs/twitter.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/svgs/instagram.svg';

/**
 * Footer (CSS-Modules version)
 * — глобальные utility-классы типа .btn остаются как есть
 * — все BEM-классы из модуля берём через объект `styles`
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__container']}>
        {/* ───── Subscription block ───── */}
        <div className={styles['footer__subscribe']}>
          <div className={styles['footer__logo']}>
            Cine<span className={styles['logo--gradient']}>mate</span>
          </div>

          <h3 className={styles['footer__title']}>Sign up to get the latest.</h3>

          <div className={styles['footer__subscribeForm']}>
            <input
              type="email"
              className={styles['footer__input']}
              placeholder="Email address"
            />
            {/* .btn – глобальный класс */}
            <button className="btn btn--primary">Sign up</button>
          </div>

          <div className={styles['footer__social']}>
            <h4 className={styles['footer__socialTitle']}>Follow us</h4>

            <div className={styles['footer__socialLinks']}>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className={`${styles.socialLink} ${styles['socialLink__icon']}`}
              >
                <FacebookIcon />
              </a>

              {/* Twitter */}
              <a
                href="#"
                aria-label="Twitter"
                className={`${styles.socialLink} ${styles['socialLink--tw']}`}
              >
                <TwitterIcon />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className={`${styles.socialLink} ${styles['socialLink--ig']}`}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ───── Quick links ───── */}
        <div className={styles['footer__links']}>
          <h3 className={styles['footer__title']}>Quick links</h3>
          <ul className={styles['footer__list']}>
            <li><a href="/movies">All films</a></li>
            <li><a href="/snacks">Snacks &amp; Drinks</a></li>
            <li><a href="/promotions">Promotions</a></li>
            <li><a href="/membership">Membership</a></li>
            <li><a href="/events">Events</a></li>
          </ul>
        </div>

        {/* ───── Contact ───── */}
        <div className={styles['footer__links']}>
          <h3 className={styles['footer__title']}>Contact</h3>
          <ul className={styles['footer__list']}>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/locations">Locations</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        {/* ───── Help center ───── */}
        <div className={styles['footer__links']}>
          <h3 className={styles['footer__title']}>Help center</h3>
          <ul className={styles['footer__list']}>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/allergen-info">Allergen info</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
          </ul>
        </div>

        {/* ───── Mobile apps ───── */}
        <div className={styles['footer__links']}>
          <h3 className={styles['footer__title']}>Mobile apps</h3>
          <ul className={styles['footer__list']}>
            <li><a href="/ios-app">iOS App</a></li>
            <li><a href="/android-app">Android App</a></li>
          </ul>
        </div>
      </div>

      <div className={styles['footer__bottom']}>
        © 2025 Cinemate. All rights reserved.
      </div>
    </footer>
  );
}
