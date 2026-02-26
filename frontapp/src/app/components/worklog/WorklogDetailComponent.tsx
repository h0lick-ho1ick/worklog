import type { Worklog } from "@/app/lib/worklogApi";
import { formatDate, formatTime } from "@/app/lib/worklogFormat";
import styles from "@/app/components/worklog/WorklogDetail.module.css";

type WorklogDetailComponentProps = {
  worklog: Worklog;
  onGoList: () => void;
  onEdit: () => void;
};

const valueOrDash = (value?: string | null) => {
  if (!value) return "-";
  const trimmed = value.trim();
  return trimmed || "-";
};

export default function WorklogDetailComponent({
  worklog,
  onGoList,
  onEdit,
}: WorklogDetailComponentProps) {
  const authorName = valueOrDash(
    worklog.authorName || worklog.user?.name || worklog.user?.username
  );

  const infoItems = [
    { label: "작성자", value: authorName },
    { label: "근무일", value: valueOrDash(worklog.workDate) },
    { label: "조 구분", value: valueOrDash(worklog.groupType) },
    { label: "근무조", value: valueOrDash(worklog.groupShift) },
    { label: "공장", value: valueOrDash(worklog.factory) },
    { label: "구분", value: valueOrDash(worklog.category) },
    { label: "시스템", value: valueOrDash(worklog.system) },
    { label: "메신저 방", value: valueOrDash(worklog.machine) },
    { label: "담당자", value: valueOrDash(worklog.assignee) },
    { label: "발생시간", value: valueOrDash(worklog.startTime) },
    { label: "완료시간", value: valueOrDash(worklog.endTime) },
    { label: "작성일", value: formatDate(worklog.createdAt) },
  ];

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>작업일지 #{worklog.id}</p>
          <h1 className={styles.title}>작업일지 상세</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.status}>{valueOrDash(worklog.status)}</span>
          <button type="button" className={styles.headerBtn} onClick={onGoList}>
            목록으로
          </button>
          <button
            type="button"
            className={`${styles.headerBtn} ${styles.headerBtnPrimary}`}
            onClick={onEdit}
          >
            수정하기
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.metaGrid}>
          {infoItems.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <p className={styles.metaLabel}>{item.label}</p>
              <p className={styles.metaValue}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className={styles.sectionGrid}>
          <div className={`${styles.sectionCard} ${styles.sectionCardWide}`}>
            <h2 className={styles.sectionTitle}>제목</h2>
            <p className={styles.sectionText}>{valueOrDash(worklog.title)}</p>
          </div>
          <div className={`${styles.sectionCard} ${styles.sectionCardWide}`}>
            <h2 className={styles.sectionTitle}>내용</h2>
            <p className={styles.sectionText}>{valueOrDash(worklog.content)}</p>
          </div>
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>비고</h2>
            <p className={styles.sectionText}>{valueOrDash(worklog.note)}</p>
          </div>
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>의견</h2>
            <p className={styles.sectionText}>{valueOrDash(worklog.opinion)}</p>
          </div>
          <div className={`${styles.sectionCard} ${styles.sectionCardWide}`}>
            <h2 className={styles.sectionTitle}>작성 시각</h2>
            <p className={styles.sectionText}>
              {formatDate(worklog.createdAt)} {formatTime(worklog.createdAt)}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
