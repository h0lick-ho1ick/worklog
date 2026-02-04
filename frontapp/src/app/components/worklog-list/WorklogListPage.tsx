import WorklogListHeader from "@/app/components/worklog-list/WorklogListHeader";
import WorklogListTable from "@/app/components/worklog-list/WorklogListTable";

export default function WorklogListPage() {
  return (
    <main className="worklog-list-page">
      <section className="list-card">
        <WorklogListHeader />
        <WorklogListTable />
      </section>
    </main>
  );
}
