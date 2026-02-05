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
  getHandoff,
  saveHandoff,
  type Worklog,
} from "@/app/lib/worklogApi";

type WorklogRow = {
  id: number;
  workDate: string;
  authorName: string;
  groupType: string;
  groupShift: string;
  factory: string;
  category: string;
  system: string;
  machine: string;
  status: string;
  assignee: string;
  startTime: string;
  endTime: string;
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
  const authorName =
    worklog.authorName?.trim() ||
    worklog.user?.name?.trim() ||
    worklog.user?.username?.trim() ||
    "-";

  const workDate = worklog.workDate
    ? (() => {
        const [year, month, day] = worklog.workDate.split("-");
        if (year && month && day) {
          return `${year} / ${month} / ${day}`;
        }
        return worklog.workDate;
      })()
    : formatDate(worklog.createdAt);

  return {
    id: worklog.id,
    workDate: workDate ?? "-",
    authorName,
    groupType: worklog.groupType ?? "-",
    groupShift: worklog.groupShift ?? "-",
    factory: worklog.factory ?? "-",
    category: worklog.category ?? "-",
    system: worklog.system ?? "-",
    machine: worklog.machine ?? "-",
    status: worklog.status ?? "-",
    assignee: worklog.assignee ?? "-",
    startTime: worklog.startTime ?? "-",
    endTime: worklog.endTime ?? "-",
  };
}

export default function WorklogListPage() {
  const router = useRouter();
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState("");
  const [handoffReceived, setHandoffReceived] = useState("");
  const [handoffSent, setHandoffSent] = useState("");
  const [handoffSaving, setHandoffSaving] = useState(false);
  const [handoffError, setHandoffError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

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
    const unique = new Set(rows.map((row) => row.workDate));
    return Array.from(unique).filter((value) => value && value !== "-");
  }, [rows]);

  useEffect(() => {
    if (!selectedCalendarDate && dateOptions.length > 0) {
      const [year, month, day] = dateOptions[0].split(" / ");
      if (year && month && day) {
        setSelectedCalendarDate(`${year}-${month}-${day}`);
      }
    }
    if (!selectedCalendarDate && dateOptions.length === 0) {
      const today = new Date();
      const year = String(today.getFullYear());
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      setSelectedCalendarDate(`${year}-${month}-${day}`);
    }
  }, [dateOptions, selectedCalendarDate]);

  useEffect(() => {
    if (!selectedCalendarDate) return;
    let isMounted = true;
    setHandoffError(null);
    getHandoff(selectedCalendarDate)
      .then((data) => {
        if (!isMounted) return;
        setHandoffReceived(data?.received ?? "");
        setHandoffSent(data?.sent ?? "");
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        setHandoffError(
          error instanceof Error ? error.message : "Failed to load handoff."
        );
      });
    return () => {
      isMounted = false;
    };
  }, [selectedCalendarDate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCalendarDate]);

  const filteredRows = useMemo(() => {
    if (selectedCalendarDate) {
      const [year, month, day] = selectedCalendarDate.split("-");
      if (year && month && day) {
        const formatted = `${year} / ${month} / ${day}`;
        return rows.filter((row) => row.workDate === formatted);
      }
    }
    return rows;
  }, [rows, selectedCalendarDate]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, pageSize, safePage]);

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

  const handleSaveHandoff = async () => {
    if (!selectedCalendarDate) return;
    setHandoffSaving(true);
    setHandoffError(null);
    try {
      await saveHandoff({
        workDate: selectedCalendarDate,
        received: handoffReceived,
        sent: handoffSent,
      });
    } catch (error: unknown) {
      setHandoffError(
        error instanceof Error ? error.message : "Failed to save handoff."
      );
    } finally {
      setHandoffSaving(false);
    }
  };

  return (
    <main className="worklog-list-page">
      <section className="list-card">
        <WorklogListHeader
          selectedCalendarDate={selectedCalendarDate}
          onCalendarDateChange={setSelectedCalendarDate}
        />
        <WorklogListHandoff
          received={handoffReceived}
          sent={handoffSent}
          isSaving={handoffSaving}
          onReceivedChange={setHandoffReceived}
          onSentChange={setHandoffSent}
          onSave={handleSaveHandoff}
        />
        {handoffError && <p>{handoffError}</p>}
        <WorklogListTable
          rows={pagedRows}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {totalPages > 1 && (
          <div className="pager">
            <button
              className="pager__btn"
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === safePage;
              return (
                <button
                  key={page}
                  className={`pager__btn${isActive ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="pager__btn"
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safePage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
      <WorklogListFab />
    </main>
  );
}
