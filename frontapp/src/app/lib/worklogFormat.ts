import type { Worklog } from "@/app/lib/worklogApi";

export type WorklogRow = {
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

export function toWorklogRow(worklog: Worklog): WorklogRow {
  const writer =
    worklog.authorName?.trim() ||
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
