"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import WorklogListFab from "@/app/components/worklog-list/WorklogListFab";
import WorklogListHandoff from "@/app/components/worklog-list/WorklogListHandoff";
import WorklogListHeader from "@/app/components/worklog-list/WorklogListHeader";
import WorklogListTable from "@/app/components/worklog-list/WorklogListTable";
import {
  deleteWorklog,
  getWorklogs,
  type Worklog,
} from "@/app/lib/worklogApi";

type WorklogRow = {
  id: number;
  writer: string;
  title: string;
  content: string;
  createdDate: string;
  createdTime: string;
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year} / ${month} / ${day}`;
}

function formatTime(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function toRow(worklog: Worklog): WorklogRow {
  const writer =
    worklog.user?.name?.trim() ||
    worklog.user?.username?.trim() ||
    "-";
  return {
    id: worklog.id,
    writer,
    title: worklog.title ?? "-",
    content: worklog.content ?? "-",
    createdDate: formatDate(worklog.createdAt),
    createdTime: formatTime(worklog.createdAt),
  };
}

export default function WorklogListPage() {
  const router = useRouter();
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setErrorMessage(null);
    getWorklogs()
      .then((data) => {
        if (isMounted) {
          setWorklogs(Array.isArray(data) ? data : []);
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error ? error.message : "Failed to load worklogs."
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = useMemo(() => worklogs.map(toRow), [worklogs]);
  const dateOptions = useMemo(() => {
    const unique = new Set(rows.map((row) => row.createdDate));
    return Array.from(unique).filter((value) => value && value !== "-");
  }, [rows]);

  useEffect(() => {
    if (!selectedDate && dateOptions.length > 0) {
      setSelectedDate(dateOptions[0]);
    }
    if (selectedDate && !dateOptions.includes(selectedDate)) {
      setSelectedDate(dateOptions[0] ?? "");
    }
  }, [dateOptions, selectedDate]);

  const filteredRows = useMemo(() => {
    if (!selectedDate) {
      return rows;
    }
    return rows.filter((row) => row.createdDate === selectedDate);
  }, [rows, selectedDate]);

  const handleEdit = (id: number) => {
    router.push(`/worklog?edit=${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this worklog?")) return;
    try {
      await deleteWorklog(id);
      const next = await getWorklogs();
      setWorklogs(Array.isArray(next) ? next : []);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to delete worklog.");
    }
  };

  return (
    <main className="worklog-list-page">
      <section className="list-card">
        <WorklogListHeader
          dateOptions={dateOptions}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <WorklogListHandoff />
        <WorklogListTable
          rows={filteredRows}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
      <WorklogListFab />
    </main>
  );
}
