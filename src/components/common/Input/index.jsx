import React from 'react';
import styles from './index.module.css';

export default function Input({ className = '', ...props }) {
  return <input className={`${styles.input} ${className}`} {...props} />;
}
