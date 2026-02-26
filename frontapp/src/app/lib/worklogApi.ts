export type ApiUser = {
  id: number;
  username: string;
  name?: string | null;
};

export type Worklog = {
  id: number;
  title: string;
  content: string;
  groupType?: string | null;
  groupShift?: string | null;
  factory?: string | null;
  category?: string | null;
  system?: string | null;
  machine?: string | null;
  status?: string | null;
  assignee?: string | null;
  authorName?: string | null;
  workDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  note?: string | null;
  opinion?: string | null;
  createdAt?: string | null;
  user?: ApiUser | null;
};

export type Handoff = {
  id: number;
  workDate: string;
  received?: string | null;
  sent?: string | null;
};

export type WorklogPayload = {
  title: string;
  content: string;
  groupType?: string;
  groupShift?: string;
  factory?: string;
  category?: string;
  system?: string;
  machine?: string;
  status?: string;
  assignee?: string;
  authorName?: string;
  workDate?: string;
  startTime?: string;
  endTime?: string;
  note?: string;
  opinion?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      text ? `Request failed: ${res.status} ${text}` : `Request failed: ${res.status}`
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export async function getWorklogs(): Promise<Worklog[]> {
  return request<Worklog[]>("/api/worklog");
}

export async function createWorklog(payload: WorklogPayload): Promise<Worklog> {
  return request<Worklog>("/api/worklog", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getWorklog(id: number): Promise<Worklog> {
  return request<Worklog>(`/api/worklog/${id}`);
}

export async function updateWorklog(
  id: number,
  payload: WorklogPayload
): Promise<Worklog> {
  return request<Worklog>(`/api/worklog/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteWorklog(id: number): Promise<void> {
  return request<void>(`/api/worklog/${id}`, {
    method: "DELETE",
  });
}

export async function getHandoff(date: string): Promise<Handoff | null> {
  const res = await fetch(`${API_BASE_URL}/api/handoff?date=${encodeURIComponent(date)}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (res.status === 204) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      text ? `Request failed: ${res.status} ${text}` : `Request failed: ${res.status}`
    );
  }
  return (await res.json()) as Handoff;
}

export async function saveHandoff(payload: {
  workDate: string;
  received?: string;
  sent?: string;
}): Promise<Handoff> {
  return request<Handoff>("/api/handoff", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
