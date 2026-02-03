import styles from "./Login.module.css";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

export default function LoginCard() {
  return (
    <div className={styles.card}>
      <LoginLeft />
      <LoginRight />
    </div>
  );
}
