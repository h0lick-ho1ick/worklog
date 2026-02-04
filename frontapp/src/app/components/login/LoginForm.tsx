import styles from "./Login.module.css";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <label className={styles.formGroup}>
        <span className={styles.label}>너거 아이디</span>
        <input className={styles.input} type="text" name="username" />
      </label>
      <label className={styles.formGroup}>
        <span className={styles.label}>너거 비밀번호</span>
        <input className={styles.input} type="password" name="password" />
      </label>
      <button className={styles.loginBtn} type="button">
        로그인 할거 말거
      </button>
    </form>
  );
}
