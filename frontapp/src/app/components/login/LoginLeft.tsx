import styles from "./Login.module.css";
import Logo from "./Logo";

export default function LoginLeft() {
  return (
    <section className={styles.left}>
      <Logo />
      <h2 className={styles.leftTitle}>
        아직 회원 아님?
        <br />
        가입 하셈
      </h2>
      <button className={styles.outlineBtn} type="button">
        회원가입
      </button>
    </section>
  );
}
