"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createWorklog, updateWorklog, type Worklog } from "@/app/lib/worklogApi";
import {
  DEFAULT_FORM_STATE,
  DETAIL_FIELDS,
  FOOTER_FIELDS,
  TOP_FIELDS,
  type WorklogFormField,
  type WorklogFormState,
} from "@/app/components/worklog/worklogFormConfig";

type WorklogFormProps = {
  initialWorklog?: Worklog | null;
  onSaved?: () => void;
  onCancelEdit?: () => void;
};

const FIELDSET_TITLE = "입력 작업 작성";
const CONTENT_LABEL = "입력 내용";
const SUBMIT_LABEL = "작성";
const SUBMITTING_LABEL = "저장 중...";
const EMPTY_CONTENT_MESSAGE = "입력 내용을 작성해 주세요.";
const SAVE_FAILED_MESSAGE = "저장에 실패했습니다.";
const DEFAULT_TITLE = "제목 없음";
const LIST_LABEL = "목록";

const formatDateInput = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const todayDateInput = () => {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const createFormState = (worklog?: Worklog | null): WorklogFormState => ({
  ...DEFAULT_FORM_STATE,
  date:
    worklog?.workDate ??
    (formatDateInput(worklog?.createdAt) || todayDateInput()),
  title: worklog?.title ?? "",
  content: worklog?.content ?? "",
  groupType: worklog?.groupType ?? DEFAULT_FORM_STATE.groupType,
  groupShift: worklog?.groupShift ?? DEFAULT_FORM_STATE.groupShift,
  factory: worklog?.factory ?? DEFAULT_FORM_STATE.factory,
  category: worklog?.category ?? DEFAULT_FORM_STATE.category,
  system: worklog?.system ?? DEFAULT_FORM_STATE.system,
  machine: worklog?.machine ?? DEFAULT_FORM_STATE.machine,
  status: worklog?.status ?? DEFAULT_FORM_STATE.status,
  assignee: worklog?.assignee ?? "",
  authorName: worklog?.authorName ?? "",
  startTime: worklog?.startTime ?? DEFAULT_FORM_STATE.startTime,
  endTime: worklog?.endTime ?? DEFAULT_FORM_STATE.endTime,
  note: worklog?.note ?? "",
  opinion: worklog?.opinion ?? "",
});

export default function WorklogForm({
  initialWorklog,
  onSaved,
  onCancelEdit,
}: WorklogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<WorklogFormState>(() =>
    createFormState(initialWorklog)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setForm(createFormState(initialWorklog));
    setErrorMessage(null);
  }, [initialWorklog]);

  const handleFieldChange = (key: keyof WorklogFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (form.status !== "완료" && form.endTime) {
      setForm((prev) => ({ ...prev, endTime: "" }));
    }
  }, [form.status, form.endTime]);

  const handleSubmit = async () => {
    const trimmedContent = form.content.trim();
    if (!trimmedContent) {
      setErrorMessage(EMPTY_CONTENT_MESSAGE);
      return;
    }

    const resolvedTitle =
      form.title.trim() || trimmedContent.split("\n")[0].slice(0, 60) || DEFAULT_TITLE;

    setIsSaving(true);
    setErrorMessage(null);

    const payload = {
      title: resolvedTitle,
      content: trimmedContent,
    groupType: form.groupType,
    groupShift: form.groupShift,
    factory: form.factory,
    category: form.category,
    system: form.system,
    machine: form.machine,
    status: form.status,
      assignee: form.assignee,
      authorName: form.authorName,
      workDate: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      note: form.note,
      opinion: form.opinion,
    };

    try {
      if (initialWorklog?.id) {
        await updateWorklog(initialWorklog.id, payload);
      } else {
        await createWorklog(payload);
      }
      setForm(createFormState());
      onSaved?.();
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : SAVE_FAILED_MESSAGE);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(createFormState());
    onCancelEdit?.();
    router.push("/worklog-list");
  };

  const renderFieldControl = (field: WorklogFormField) => {
    if (field.kind === "date") {
      return (
        <input
          className="control"
          type="date"
          value={form[field.stateKey] ?? ""}
          onChange={(event) => handleFieldChange(field.stateKey, event.target.value)}
        />
      );
    }

    if (field.kind === "time") {
      const isEndTime = field.stateKey === "endTime";
      const isDisabled = isEndTime && form.status !== "완료";
      return (
        <input
          className="control"
          type="time"
          value={form[field.stateKey] ?? ""}
          onChange={(event) => handleFieldChange(field.stateKey, event.target.value)}
          disabled={isDisabled}
        />
      );
    }

    if (field.kind === "text") {
      return (
        <input
          className="control"
          placeholder={field.placeholder}
          value={form[field.stateKey] ?? ""}
          onChange={(event) => handleFieldChange(field.stateKey, event.target.value)}
        />
      );
    }

    return (
      <select
        className="control"
        value={form[field.stateKey] ?? ""}
        onChange={(event) => handleFieldChange(field.stateKey, event.target.value)}
      >
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <header className="panel__header">
        <h1 className="panel__title">{FIELDSET_TITLE}</h1>
      </header>

      <div className="panel__body">
        <div className="grid grid--4">
          {TOP_FIELDS.map((field) => (
            <div className="field" key={field.id}>
              <label className="label">{field.label}</label>
              {renderFieldControl(field)}
            </div>
          ))}
        </div>

        <hr className="dash" />

        <div className="grid grid--6">
          {DETAIL_FIELDS.map((field) => (
            <div className="field" key={field.id}>
              <label className="label">{field.label}</label>
              {renderFieldControl(field)}
            </div>
          ))}
        </div>

        <div className="field field--mt">
          <label className="label">{CONTENT_LABEL}</label>
          <textarea
            className="control control--ta control--ta-lg"
            rows={4}
            value={form.content}
            onChange={(event) => handleFieldChange("content", event.target.value)}
          />
        </div>

        <div className="grid grid--2 field--mt">
          <div className="field">
            <label className="label">{FOOTER_FIELDS[0]}</label>
            <input
              className="control"
              value={form.note}
              onChange={(event) => handleFieldChange("note", event.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">{FOOTER_FIELDS[1]}</label>
            <input
              className="control"
              value={form.opinion}
              onChange={(event) => handleFieldChange("opinion", event.target.value)}
            />
          </div>
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <div className="actions">
          <button
            className="btn btn--primary"
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? SUBMITTING_LABEL : SUBMIT_LABEL}
          </button>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
          >
            {LIST_LABEL}
          </button>
        </div>
      </div>
    </>
  );
}
