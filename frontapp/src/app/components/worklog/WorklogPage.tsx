import WorklogForm from "@/app/components/worklog/WorklogForm";
import WorklogTable from "@/app/components/worklog/WorklogTable";
import WorklogFab from "@/app/components/worklog/WorklogFab";

export default function WorklogPage() {
  return (
    <main className="worklog-page">
      <section className="panel">
        <WorklogForm />
        <WorklogTable />
      </section>
      <WorklogFab />
    </main>
  );
}
