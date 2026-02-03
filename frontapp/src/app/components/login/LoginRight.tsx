import styles from "./Login.module.css";
import LoginForm from "./LoginForm";

export default function LoginRight() {
  return (
    <section className={styles.right}>
      <h1 className={styles.rightTitle}>Login</h1>
      <LoginForm />
    </section>
  );
}
