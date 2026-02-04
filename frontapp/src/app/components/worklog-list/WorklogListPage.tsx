"use client";

import { useMemo, useState } from "react";
import WorklogListFab from "@/app/components/worklog-list/WorklogListFab";
import WorklogListHandoff from "@/app/components/worklog-list/WorklogListHandoff";
import WorklogListHeader from "@/app/components/worklog-list/WorklogListHeader";
import WorklogListTable from "@/app/components/worklog-list/WorklogListTable";

const WORKLOG_ROWS = [
  {
    id: 1,
    date: "2026 / 01 / 27",
    factory: "HU1",
    system: "MES",
    room: "헝가리1,2,시...",
    detail: "업무내용",
    time: "16:09",
    completionTime: "18:02",
    status: "완료",
    owner: "홍길동",
    writer: "B조 / 이희호",
    note: "무야호",
  },
  {
    id: 2,
    date: "2026 / 01 / 27",
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "16:09",
    completionTime: "17:20",
    status: "진행 중",
    owner: "홍길동",
    writer: "D조 / 함태식",
    note: "무야호",
  },
  {
    id: 3,
    date: "2026 / 01 / 26",
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "16:09",
    completionTime: "18:45",
    status: "등록",
    owner: "홍길동",
    writer: "A조 / 서영석",
    note: "무야호",
  },
];

export default function WorklogListPage() {
  const dateOptions = useMemo(
    () => Array.from(new Set(WORKLOG_ROWS.map((row) => row.date))),
    []
  );
  const [selectedDate, setSelectedDate] = useState(dateOptions[0] ?? "");
  const filteredRows = useMemo(() => {
    if (!selectedDate) {
      return WORKLOG_ROWS;
    }
    return WORKLOG_ROWS.filter((row) => row.date === selectedDate);
  }, [selectedDate]);

  return (
    <main className="worklog-list-page">
      <section className="list-card">
        <WorklogListHeader
          dateOptions={dateOptions}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <WorklogListHandoff />
        <WorklogListTable rows={filteredRows} />
      </section>
      <WorklogListFab />
    </main>
  );
}
