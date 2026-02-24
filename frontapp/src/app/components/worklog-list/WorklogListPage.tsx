"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import WorklogListFab from "@/app/components/worklog-list/WorklogListFab";
import WorklogListHandoff from "@/app/components/worklog-list/WorklogListHandoff";
import WorklogListHeader from "@/app/components/worklog-list/WorklogListHeader";
import WorklogListTable from "@/app/components/worklog-list/WorklogListTable";
import { getErrorMessage } from "@/app/lib/error";
import {
  formatDate,
  toWorklogListRow,
  type WorklogListRow,
} from "@/app/lib/worklogFormat";
import {
  deleteWorklog,
  getHandoff,
  getWorklogs,
  saveHandoff,
  type Worklog,
} from "@/app/lib/worklogApi";

function toIsoDateInput(slashDate: string) {
  const [year, month, day] = slashDate.split(" / ");
  if (year && month && day) {
    return `${year}-${month}-${day}`;
  }
  return "";
}

function getTodayIsoDate() {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
          setErrorMessage(getErrorMessage(error, "작업일지를 불러오지 못했습니다."));
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

  const rows = useMemo<WorklogListRow[]>(
    () => worklogs.map(toWorklogListRow),
    [worklogs]
  );

  const dateOptions = useMemo(() => {
    const unique = new Set(rows.map((row) => row.workDate));
    return Array.from(unique).filter((value) => value && value !== "-");
  }, [rows]);

  useEffect(() => {
    if (!selectedCalendarDate && dateOptions.length > 0) {
      setSelectedCalendarDate(toIsoDateInput(dateOptions[0]));
      return;
    }

    if (!selectedCalendarDate && dateOptions.length === 0) {
      setSelectedCalendarDate(getTodayIsoDate());
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
        setHandoffError(getErrorMessage(error, "인계사항을 불러오지 못했습니다."));
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCalendarDate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCalendarDate]);

  const filteredRows = useMemo(() => {
    if (!selectedCalendarDate) {
      return rows;
    }

    const formattedDate = formatDate(selectedCalendarDate);
    return rows.filter((row) => row.workDate === formattedDate);
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
    if (!confirm("이 작업일지를 삭제할까요?")) return;

    try {
      await deleteWorklog(id);
      const next = await getWorklogs();
      setWorklogs(Array.isArray(next) ? next : []);
    } catch (error: unknown) {
      alert(getErrorMessage(error, "작업일지 삭제에 실패했습니다."));
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
      setHandoffError(getErrorMessage(error, "인계사항 저장에 실패했습니다."));
    } finally {
      setHandoffSaving(false);
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`/worklog/${id}`);
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
          onRowClick={handleRowClick}
        />
        {totalPages > 1 && (
          <div className="pager">
            <button
              className="pager__btn"
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage === 1}
            >
              이전
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={safePage === totalPages}
            >
              다음
            </button>
          </div>
        )}
      </section>
      <WorklogListFab />
    </main>
  );
}

