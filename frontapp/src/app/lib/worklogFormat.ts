import type { Worklog } from "@/app/lib/worklogApi";

export type WorklogSummaryRow = {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdDate: string;
  createdTime: string;
};

export type WorklogListRow = {
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

export function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year} / ${month} / ${day}`;
}

export function formatTime(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function resolveAuthorName(worklog: Worklog) {
  return (
    worklog.authorName?.trim() ||
    worklog.user?.name?.trim() ||
    worklog.user?.username?.trim() ||
    "-"
  );
}

export function toWorklogSummaryRow(worklog: Worklog): WorklogSummaryRow {
  const writer =
    resolveAuthorName(worklog);

  return {
    id: worklog.id,
    title: worklog.title ?? "-",
    content: worklog.content ?? "-",
    writer,
    createdDate: formatDate(worklog.createdAt),
    createdTime: formatTime(worklog.createdAt),
  };
}

function resolveWorkDate(worklog: Worklog): string {
  if (worklog.workDate) {
    const [year, month, day] = worklog.workDate.split("-");
    if (year && month && day) {
      return `${year} / ${month} / ${day}`;
    }
    return worklog.workDate;
  }
  return formatDate(worklog.createdAt);
}

export function toWorklogListRow(worklog: Worklog): WorklogListRow {
  return {
    id: worklog.id,
    workDate: resolveWorkDate(worklog),
    authorName: resolveAuthorName(worklog),
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
