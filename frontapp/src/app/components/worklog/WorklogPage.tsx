"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import WorklogForm from "@/app/components/worklog/WorklogForm";
import WorklogTable from "@/app/components/worklog/WorklogTable";
import {
  deleteWorklog,
  getWorklogs,
  type Worklog,
} from "@/app/lib/worklogApi";

type WorklogRow = {
  id: number;
  title: string;
  content: string;
  writer: string;
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
    title: worklog.title ?? "-",
    content: worklog.content ?? "-",
    writer,
    createdDate: formatDate(worklog.createdAt),
    createdTime: formatTime(worklog.createdAt),
  };
}

export default function WorklogPage() {
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");
  const editId = editParam ? Number(editParam) : null;

  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [selectedWorklog, setSelectedWorklog] = useState<Worklog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadWorklogs = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await getWorklogs();
      setWorklogs(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load worklogs."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWorklogs();
  }, [loadWorklogs]);

  useEffect(() => {
    if (!editId) return;
    const found = worklogs.find((item) => item.id === editId) ?? null;
    setSelectedWorklog(found);
  }, [editId, worklogs]);

  const rows = useMemo(() => worklogs.map(toRow), [worklogs]);

  const handleEdit = (id: number) => {
    const found = worklogs.find((item) => item.id === id) ?? null;
    setSelectedWorklog(found);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this worklog?")) return;
    try {
      await deleteWorklog(id);
      await loadWorklogs();
      if (selectedWorklog?.id === id) {
        setSelectedWorklog(null);
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to delete worklog.");
    }
  };

  const handleSaved = async () => {
    await loadWorklogs();
    setSelectedWorklog(null);
  };

  return (
    <main className="worklog-page">
      <section className="panel">
        <WorklogForm
          initialWorklog={selectedWorklog}
          onSaved={handleSaved}
          onCancelEdit={() => setSelectedWorklog(null)}
        />
        <WorklogTable
          rows={rows}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}
