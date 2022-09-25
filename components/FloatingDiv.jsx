import React from 'react';
import styles from '../styles/FloatingDiv.module.css';

export const FloatingDiv = ({ txt1, txt2 }) => {
  return (
    <div className={styles.FloatingDiv}>
      <span>
        {txt1}
        <br />
        {txt2}
      </span>
    </div>
  );
};
