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
  createdAt?: string | null;
  user?: ApiUser | null;
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

export async function createWorklog(payload: {
  title: string;
  content: string;
  groupType?: string;
  groupShift?: string;
  factory?: string;
  category?: string;
  system?: string;
  machine?: string;
  status?: string;
}): Promise<Worklog> {
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
  payload: {
    title: string;
    content: string;
    groupType?: string;
    groupShift?: string;
    factory?: string;
    category?: string;
    system?: string;
    machine?: string;
    status?: string;
  }
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
