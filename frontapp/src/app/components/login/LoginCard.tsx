"use client";

import { useState } from "react";
import styles from "./Login.module.css";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

type AuthMode = "login" | "register";

export default function LoginCard() {
  const [activeTab, setActiveTab] = useState<AuthMode>("login");

  return (
    <div className={styles.card}>
      <LoginLeft
        activeTab={activeTab}
        onToggle={(nextTab) => setActiveTab(nextTab)}
      />
      <LoginRight activeTab={activeTab} />
    </div>
  );
}

