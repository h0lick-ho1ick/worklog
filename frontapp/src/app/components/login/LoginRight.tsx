"use client";

import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthMode = "login" | "register";

type LoginRightProps = {
  activeTab: AuthMode;
};

export default function LoginRight({ activeTab }: LoginRightProps) {
  const isLogin = activeTab === "login";

  return (
    <section className={`${styles.right} ${styles.panelFromRight}`}>
      <div className={styles.panelWrap}>
        <div
          className={`${styles.panelSlider} ${
            isLogin ? styles.panelSliderLogin : styles.panelSliderRegister
          }`}
        >
          <div className={styles.panel}>
            <h1 className={styles.rightTitle}>Login</h1>
            <LoginForm />
          </div>
          <div className={styles.panel}>
            <h1 className={styles.rightTitle}>Sign Up</h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

