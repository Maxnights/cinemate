import React from 'react';
import styles from './index.module.css';

export default function Button({ className = '', ...props }) {
  return <button className={`${styles.button} ${className}`} {...props} />;
}
