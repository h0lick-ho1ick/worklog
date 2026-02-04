export default function WorklogForm() {
  return (
    <>
      <header className="panel__header">
        <h1 className="panel__title">업무 일지 작성</h1>
      </header>

      <div className="panel__body">
        <div className="grid grid--4">
          <div className="field">
            <label className="label">날짜</label>
            <select className="control">
              <option>2026 / 01 / 27</option>
            </select>
          </div>

          <div className="field">
            <label className="label">근무 팀</label>
            <select className="control">
              <option>B팀</option>
            </select>
          </div>

          <div className="field">
            <label className="label">작성자</label>
            <select className="control">
              <option>선택하세요</option>
            </select>
          </div>

          <div className="field">
            <label className="label">근무 shift</label>
            <select className="control">
              <option>선택하세요</option>
            </select>
          </div>
        </div>

        <div className="field field--mt">
          <label className="label">인계 받은 사항</label>
          <textarea className="control control--ta" rows={2} />
        </div>

        <div className="field">
          <label className="label">인계 사항</label>
          <textarea className="control control--ta" rows={2} />
        </div>

        <hr className="dash" />

        <div className="grid grid--6">
          <div className="field">
            <label className="label">공장</label>
            <select className="control">
              <option>HU1</option>
            </select>
          </div>
          <div className="field">
            <label className="label">구분</label>
            <select className="control">
              <option>정기배포</option>
            </select>
          </div>
          <div className="field">
            <label className="label">시스템</label>
            <select className="control">
              <option>MES</option>
            </select>
          </div>
          <div className="field">
            <label className="label">메신저 방</label>
            <select className="control">
              <option>헝가리...</option>
            </select>
          </div>
          <div className="field">
            <label className="label">담당자</label>
            <select className="control">
              <option>홍길동</option>
            </select>
          </div>
          <div className="field">
            <label className="label">상태</label>
            <select className="control">
              <option>진행 중</option>
            </select>
          </div>
        </div>

        <div className="field field--mt">
          <label className="label">업무내용</label>
          <textarea className="control control--ta control--ta-lg" rows={4} />
        </div>

        <div className="grid grid--2 field--mt">
          <div className="field">
            <label className="label">비고</label>
            <input className="control" />
          </div>
          <div className="field">
            <label className="label">의견</label>
            <input className="control" />
          </div>
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
