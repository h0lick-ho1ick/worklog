"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorklogDetailComponent from "@/app/components/worklog/WorklogDetailComponent";
import WorklogNotFound from "@/app/components/worklog/WorklogNotFound";
import { getErrorMessage } from "@/app/lib/error";
import { getWorklog, type Worklog } from "@/app/lib/worklogApi";
import styles from "@/app/components/worklog/WorklogDetail.module.css";

type WorklogDetailPageClientProps = {
  worklogId: number;
};

export default function WorklogDetailPageClient({
  worklogId,
}: WorklogDetailPageClientProps) {
  const router = useRouter();
  const isInvalidId = !Number.isInteger(worklogId) || worklogId <= 0;
  const [worklog, setWorklog] = useState<Worklog | null>(null);
  const [isLoading, setIsLoading] = useState(!isInvalidId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isInvalidId) {
      return;
    }

    let isMounted = true;

    getWorklog(worklogId)
      .then((data) => {
        if (isMounted) {
          setWorklog(data);
        }
      })
      .catch((error: unknown) => {
        if (!isMounted) return;

        const message = getErrorMessage(
          error,
          "작업일지를 불러오지 못했습니다."
        );
        if (message.includes("404")) {
          setWorklog(null);
          return;
        }
        setErrorMessage(message);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [worklogId, isInvalidId]);

  if (isInvalidId) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <div className={styles.stateCard}>
            <h1 className={styles.stateTitle}>오류</h1>
            <p className={styles.stateText}>잘못된 작업일지 ID입니다.</p>
          </div>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <div className={styles.stateCard}>
            <h1 className={styles.stateTitle}>작업일지 불러오는 중...</h1>
          </div>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <div className={styles.stateCard}>
            <h1 className={styles.stateTitle}>오류</h1>
            <p className={styles.stateText}>{errorMessage}</p>
          </div>
        </section>
      </main>
    );
  }

  if (!worklog) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <WorklogNotFound />
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <WorklogDetailComponent
          worklog={worklog}
          onGoList={() => router.push("/worklog-list")}
          onEdit={() => router.push(`/worklog?edit=${worklog.id}`)}
        />
      </section>
    </main>
  );
}
