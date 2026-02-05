"use client";

import { useEffect, useMemo, useState } from "react";
import { createWorklog, updateWorklog, type Worklog } from "@/app/lib/worklogApi";

type WorklogFormProps = {
  initialWorklog?: Worklog | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
};

const GROUP_TYPE_OPTIONS = ["정규", "특별"];
const GROUP_SHIFT_OPTIONS = ["주간", "야간"];
const FACTORY_OPTIONS = ["1공장", "2공장"];
const CATEGORY_OPTIONS = ["기계", "전기", "기타"];
const SYSTEM_OPTIONS = ["라인A", "라인B"];
const MACHINE_OPTIONS = ["M-1", "M-2"];
const STATUS_OPTIONS = ["진행", "완료"];

const TOP_FIELDS = [
  { label: "날짜", type: "date" as const },
  { label: "그룹 구분", type: "groupType" as const, options: GROUP_TYPE_OPTIONS },
  { label: "작성자", type: "author" as const },
  { label: "그룹 shift", type: "groupShift" as const, options: GROUP_SHIFT_OPTIONS },
];

const DETAIL_FIELDS = [
  { label: "공장", type: "factory" as const, options: FACTORY_OPTIONS },
  { label: "구분", type: "category" as const, options: CATEGORY_OPTIONS },
  { label: "시스템", type: "system" as const, options: SYSTEM_OPTIONS },
  { label: "머신/방", type: "machine" as const, options: MACHINE_OPTIONS },
  { label: "담당자", type: "text" as const, placeholder: "-" },
  { label: "상태", type: "status" as const, options: STATUS_OPTIONS },
  { label: "발생시간", type: "time" as const },
  { label: "완료시간", type: "time" as const },
];

const FOOTER_FIELDS = ["비고", "의견"];

type AuthorOption = {
  id: string;
  name: string;
};

async function fetchAuthors(): Promise<AuthorOption[]> {
  return [];
}

export default function WorklogForm({
  initialWorklog,
  onSaved,
  onCancelEdit,
}: WorklogFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [groupType, setGroupType] = useState(GROUP_TYPE_OPTIONS[0]);
  const [groupShift, setGroupShift] = useState(GROUP_SHIFT_OPTIONS[0]);
  const [factory, setFactory] = useState(FACTORY_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [system, setSystem] = useState(SYSTEM_OPTIONS[0]);
  const [machine, setMachine] = useState(MACHINE_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [authors, setAuthors] = useState<AuthorOption[]>([]);
  const [isAuthorsLoading, setIsAuthorsLoading] = useState(true);

  useEffect(() => {
    setTitle(initialWorklog?.title ?? "");
    setContent(initialWorklog?.content ?? "");
    setGroupType(initialWorklog?.groupType ?? GROUP_TYPE_OPTIONS[0]);
    setGroupShift(initialWorklog?.groupShift ?? GROUP_SHIFT_OPTIONS[0]);
    setFactory(initialWorklog?.factory ?? FACTORY_OPTIONS[0]);
    setCategory(initialWorklog?.category ?? CATEGORY_OPTIONS[0]);
    setSystem(initialWorklog?.system ?? SYSTEM_OPTIONS[0]);
    setMachine(initialWorklog?.machine ?? MACHINE_OPTIONS[0]);
    setStatus(initialWorklog?.status ?? STATUS_OPTIONS[0]);
    setErrorMessage(null);
  }, [initialWorklog]);

  useEffect(() => {
    let isMounted = true;
    fetchAuthors()
      .then((data) => {
        if (isMounted) {
          setAuthors(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsAuthorsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const authorOptions = useMemo(() => {
    if (isAuthorsLoading) {
      return [{ id: "loading", name: "불러오는 중..." }];
    }
    if (authors.length === 0) {
      return [{ id: "empty", name: "작성자 없음" }];
    }
    return authors;
  }, [authors, isAuthorsLoading]);

  const handleSubmit = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setErrorMessage("입력내용을 작성해 주세요.");
      return;
    }

    const resolvedTitle = title.trim() || trimmedContent.split("\n")[0].slice(0, 60) || "제목 없음";

    setIsSaving(true);
    setErrorMessage(null);

    try {
      if (initialWorklog?.id) {
        await updateWorklog(initialWorklog.id, {
          title: resolvedTitle,
          content: trimmedContent,
          groupType,
          groupShift,
          factory,
          category,
          system,
          machine,
          status,
        });
      } else {
        await createWorklog({
          title: resolvedTitle,
          content: trimmedContent,
          groupType,
          groupShift,
          factory,
          category,
          system,
          machine,
          status,
        });
      }
      setTitle("");
      setContent("");
      setGroupType(GROUP_TYPE_OPTIONS[0]);
      setGroupShift(GROUP_SHIFT_OPTIONS[0]);
      setFactory(FACTORY_OPTIONS[0]);
      setCategory(CATEGORY_OPTIONS[0]);
      setSystem(SYSTEM_OPTIONS[0]);
      setMachine(MACHINE_OPTIONS[0]);
      setStatus(STATUS_OPTIONS[0]);
      onSaved?.();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "저장에 실패했습니다."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setGroupType(GROUP_TYPE_OPTIONS[0]);
    setGroupShift(GROUP_SHIFT_OPTIONS[0]);
    setFactory(FACTORY_OPTIONS[0]);
    setCategory(CATEGORY_OPTIONS[0]);
    setSystem(SYSTEM_OPTIONS[0]);
    setMachine(MACHINE_OPTIONS[0]);
    setStatus(STATUS_OPTIONS[0]);
    onCancelEdit?.();
  };

  return (
    <>
      <header className="panel__header">
        <h1 className="panel__title">입력 일지 작성</h1>
      </header>

      <div className="panel__body">
        <div className="grid grid--4">
          {TOP_FIELDS.map((field) => (
            <div className="field" key={field.label}>
              <label className="label">{field.label}</label>
              {field.type === "date" ? (
                <input className="control" type="date" />
              ) : field.type === "author" ? (
                <select className="control" disabled={isAuthorsLoading}>
                  {authorOptions.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              ) : field.type === "groupType" ? (
                <select
                  className="control"
                  value={groupType}
                  onChange={(event) => setGroupType(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "groupShift" ? (
                <select
                  className="control"
                  value={groupShift}
                  onChange={(event) => setGroupShift(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <select className="control" disabled>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <hr className="dash" />

        <div className="grid grid--6">
          {DETAIL_FIELDS.map((field) => (
            <div className="field" key={field.label}>
              <label className="label">{field.label}</label>
              {field.type === "text" ? (
                <input className="control" placeholder={field.placeholder} disabled />
              ) : field.type === "time" ? (
                <input className="control" type="time" disabled />
              ) : field.type === "factory" ? (
                <select
                  className="control"
                  value={factory}
                  onChange={(event) => setFactory(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "category" ? (
                <select
                  className="control"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "system" ? (
                <select
                  className="control"
                  value={system}
                  onChange={(event) => setSystem(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "machine" ? (
                <select
                  className="control"
                  value={machine}
                  onChange={(event) => setMachine(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "status" ? (
                <select
                  className="control"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <select className="control" disabled>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="field field--mt">
          <label className="label">입력내용</label>
          <textarea
            className="control control--ta control--ta-lg"
            rows={4}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <div className="grid grid--2 field--mt">
          {FOOTER_FIELDS.map((label) => (
            <div className="field" key={label}>
              <label className="label">{label}</label>
              <input className="control" disabled />
            </div>
          ))}
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <div className="actions">
          <button
            className="btn btn--primary"
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? "저장중..." : "작성"}
          </button>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
