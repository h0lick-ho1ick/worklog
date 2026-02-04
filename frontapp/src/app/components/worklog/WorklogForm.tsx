const TOP_FIELDS = [
  { label: "날짜", options: ["2026 / 01 / 27"] },
  { label: "근무 팀", options: ["B팀"] },
  { label: "작성자", options: ["선택하세요"] },
  { label: "근무 shift", options: ["선택하세요"] },
];

const HANDOFF_FIELDS = [
  { label: "인계 받은 사항", rows: 2 },
  { label: "인계 사항", rows: 2 },
];

const DETAIL_FIELDS = [
  { label: "공장", options: ["HU1"] },
  { label: "구분", options: ["정기배포"] },
  { label: "시스템", options: ["MES"] },
  { label: "메신저 방", options: ["헝가리..."] },
  { label: "담당자", type: "text" as const, placeholder: "홍길동" },
  { label: "상태", options: ["진행 중"] },
];

const FOOTER_FIELDS = ["비고", "의견"];

export default function WorklogForm() {
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
              <select className="control">
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {HANDOFF_FIELDS.map((field, index) => (
          <div
            className={`field${index === 0 ? " field--mt" : ""}`}
            key={field.label}
          >
            <label className="label">{field.label}</label>
            <textarea className="control control--ta" rows={field.rows} />
          </div>
        ))}

        <hr className="dash" />

        <div className="grid grid--6">
          {DETAIL_FIELDS.map((field) => (
            <div className="field" key={field.label}>
              <label className="label">{field.label}</label>
              {field.type === "text" ? (
                <input className="control" placeholder={field.placeholder} />
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
        </div>
      </div>
    </>
  );
}
