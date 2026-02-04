export default function WorklogListHandoff() {
  return (
    <div className="handoff-section">
      <div className="handoff">
        <div className="handoff__field">
          <span className="filter__label">인계 받은 사항</span>
          <textarea className="control control--ta" rows={2} />
        </div>
        <div className="handoff__field">
          <span className="filter__label">인계 사항</span>
          <textarea className="control control--ta" rows={2} />
        </div>
      </div>
    </div>
  );
}
