"use client";

import styles from "./Login.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <span className={styles.pin} aria-hidden="true" />
      <span>WorkLog</span>
    </div>
  );
}
