type WorklogListHandoffProps = {
  received: string;
  sent: string;
  isSaving: boolean;
  onReceivedChange: (value: string) => void;
  onSentChange: (value: string) => void;
  onSave: () => void;
};

export default function WorklogListHandoff({
  received,
  sent,
  isSaving,
  onReceivedChange,
  onSentChange,
  onSave,
}: WorklogListHandoffProps) {
  return (
    <div className="handoff-section">
      <div className="handoff">
        <div className="handoff__field">
          <span className="filter__label">인계 받은 사항</span>
          <textarea
            className="control control--ta"
            rows={2}
            value={received}
            onChange={(event) => onReceivedChange(event.target.value)}
          />
        </div>
        <div className="handoff__field">
          <span className="filter__label">인계 사항</span>
          <textarea
            className="control control--ta"
            rows={2}
            value={sent}
            onChange={(event) => onSentChange(event.target.value)}
          />
        </div>
        <div className="handoff__actions">
          <button
            className="btn btn--primary"
            type="button"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
