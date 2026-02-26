import styles from "./Login.module.css";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <LoginCard />
      </div>
    </div>
  );
}
