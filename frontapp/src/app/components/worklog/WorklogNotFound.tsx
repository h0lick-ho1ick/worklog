import styles from "@/app/components/worklog/WorklogDetail.module.css";

export default function WorklogNotFound() {
  return (
    <div className={styles.stateCard}>
      <h1 className={styles.stateTitle}>작업일지를 찾을 수 없습니다</h1>
      <p className={styles.stateText}>요청한 작업일지가 존재하지 않습니다.</p>
    </div>
  );
}
