"use client";

import styles from "./Login.module.css";

export default function RegisterForm() {
  return (
    <form className={styles.form}>
      <label className={styles.formGroup}>
        <span className={styles.label}>이름</span>
        <input className={styles.input} type="text" name="name" />
      </label>
      <label className={styles.formGroup}>
        <span className={styles.label}>이메일</span>
        <input className={styles.input} type="email" name="email" />
      </label>
      <label className={styles.formGroup}>
        <span className={styles.label}>비밀번호</span>
        <input className={styles.input} type="password" name="password" />
      </label>
      <label className={styles.formGroup}>
        <span className={styles.label}>비밀번호 확인</span>
        <input className={styles.input} type="password" name="confirmPassword" />
      </label>
      <button className={styles.loginBtn} type="button">
        회원가입
      </button>
    </form>
  );
}
