"use client";

import { useEffect, useMemo, useState } from "react";

const TOP_FIELDS = [
  { label: "날짜", type: "date" as const },
  { label: "근무 팀", options: ["A조", "B조", "C조", "D조"] },
  { label: "작성자", type: "author" as const },
  { label: "근무 shift", options: ["전근", "후근", "야근"] },
];

const DETAIL_FIELDS = [
  { label: "공장", options: ["HU1"] },
  { label: "구분", options: ["정기배포"] },
  { label: "시스템", options: ["MES"] },
  { label: "메신저 방", options: ["헝가리..."] },
  { label: "담당자", type: "text" as const, placeholder: "홍길동" },
  { label: "상태", options: ["등록", "진행 중", "완료"] },
  { label: "발생시간", type: "time" as const },
  { label: "완료시간", type: "time" as const },
];

const FOOTER_FIELDS = ["비고", "의견"];

type AuthorOption = {
  id: string;
  name: string;
};

async function fetchAuthors(): Promise<AuthorOption[]> {
  // TODO: Replace with real API call when backend is ready.
  // Example: const res = await fetch("/api/users"); return await res.json();
  return [];
}

export default function WorklogForm() {
  const [authors, setAuthors] = useState<AuthorOption[]>([]);
  const [isAuthorsLoading, setIsAuthorsLoading] = useState(true);

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

  return (
    <>
      <header className="panel__header">
        <h1 className="panel__title">업무 일지 작성</h1>
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
              ) : (
                <select className="control">
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
                <input className="control" placeholder={field.placeholder} />
              ) : field.type === "time" ? (
                <input className="control" type="time" />
              ) : (
                <select className="control">
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="field field--mt">
          <label className="label">업무내용</label>
          <textarea className="control control--ta control--ta-lg" rows={4} />
        </div>

        <div className="grid grid--2 field--mt">
          {FOOTER_FIELDS.map((label) => (
            <div className="field" key={label}>
              <label className="label">{label}</label>
              <input className="control" />
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn btn--primary" type="button">
            작성
          </button>
          <button className="btn btn--ghost" type="button">
            취소
          </button>
        </div>
      </div>
    </>
  );
}
