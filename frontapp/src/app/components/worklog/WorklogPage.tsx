"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import WorklogForm from "@/app/components/worklog/WorklogForm";
import WorklogTable from "@/app/components/worklog/WorklogTable";
import { deleteWorklog, getWorklogs, type Worklog } from "@/app/lib/worklogApi";
import { toWorklogRow } from "@/app/lib/worklogFormat";

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

  const rows = useMemo(() => worklogs.map(toWorklogRow), [worklogs]);

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
