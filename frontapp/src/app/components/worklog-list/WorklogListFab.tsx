"use client";

import { useRouter } from "next/navigation";

export default function WorklogListFab() {
  const router = useRouter();

  return (
    <button
      className="fab"
      aria-label="add"
      type="button"
      onClick={() => router.push("/worklog")}
    >
      <span className="fab__plus">+</span>
    </button>
  );
}
