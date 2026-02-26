"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WorklogForm from "@/app/components/worklog/WorklogForm";
import { getErrorMessage } from "@/app/lib/error";
import { getWorklog, type Worklog } from "@/app/lib/worklogApi";

export default function WorklogCreateEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");
  const editId = editParam ? Number(editParam) : null;

  const [initialWorklog, setInitialWorklog] = useState<Worklog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (editId) {
      const fetchWorklog = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
          const data = await getWorklog(editId);
          setInitialWorklog(data);
        } catch (error: unknown) {
          setErrorMessage(
            getErrorMessage(error, "수정할 작업일지를 불러오지 못했습니다.")
          );
        } finally {
          setIsLoading(false);
        }
      };
      fetchWorklog();
    } else {
      setIsLoading(false);
      setInitialWorklog(null); // For new worklog creation
    }
  }, [editId]);

  const handleSaved = useCallback(() => {
    router.push("/worklog-list");
  }, [router]);

  const handleCancelEdit = useCallback(() => {
    router.push("/worklog-list");
  }, [router]);

  if (isLoading) {
    return (
      <main className="worklog-page">
        <section className="panel">
          <div className="panel__status">작업일지를 불러오는 중...</div>
        </section>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="worklog-page">
        <section className="panel">
          <div className="panel__status panel__status--error">{errorMessage}</div>
        </section>
      </main>
    );
  }

  return (
    <main className="worklog-page">
      <section className="panel">
        <WorklogForm
          initialWorklog={initialWorklog}
          onSaved={handleSaved}
          onCancelEdit={handleCancelEdit}
        />
      </section>
    </main>
  );
}
