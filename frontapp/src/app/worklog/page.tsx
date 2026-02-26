import { Suspense } from "react";
import WorklogCreateEditPage from "@/app/components/worklog/WorklogCreateEditPage";
import "./worklog.css";

export default function Worklog() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <WorklogCreateEditPage />
    </Suspense>
  );
}
