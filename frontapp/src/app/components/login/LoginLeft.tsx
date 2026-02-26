"use client";

import styles from "./Login.module.css";
import Logo from "./Logo";

type AuthMode = "login" | "register";

type LoginLeftProps = {
  activeTab: AuthMode;
  onToggle: (nextTab: AuthMode) => void;
};

export default function LoginLeft({ activeTab, onToggle }: LoginLeftProps) {
  const isLogin = activeTab === "login";

  return (
    <section className={`${styles.left} ${styles.panelFromLeft}`}>
      <Logo />
      <h2 className={styles.leftTitle}>
        {isLogin ? "마 JB서퍼트! 근무일지다" : "이미 회원이고?"}
        <br />
        {isLogin ? "가입 할끼가?" : "로그인 하레이"}
      </h2>
      <button
        className={styles.outlineBtn}
        onClick={() => onToggle(isLogin ? "register" : "login")}
        type="button"
      >
        {isLogin ? "회원가입" : "로그인"}
      </button>
    </section>
  );
}
