type WorklogRow = {
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

type WorklogTableProps = {
  rows: WorklogRow[];
  isLoading: boolean;
  errorMessage?: string | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function WorklogTable({
  rows,
  isLoading,
  errorMessage,
  onEdit,
  onDelete,
}: WorklogTableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th className="num">번호</th>
            <th>작성자</th>
            <th>조 구분</th>
            <th>그룹 shift</th>
            <th>공장</th>
            <th>구분</th>
            <th>시스템</th>
            <th>메신저 방</th>
            <th>상태</th>
            <th>담당자</th>
            <th>발생시간</th>
            <th>완료시간</th>
            <th className="row-actions">작업</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={13}>Loading...</td>
            </tr>
          )}
          {!isLoading && errorMessage && (
            <tr>
              <td colSpan={13}>{errorMessage}</td>
            </tr>
          )}
          {!isLoading && !errorMessage && rows.length === 0 && (
            <tr>
              <td colSpan={13}>No worklogs.</td>
            </tr>
          )}
          {!isLoading &&
            !errorMessage &&
            rows.map((row) => (
              <tr key={row.id}>
                <td className="t-num">{row.id}</td>
                <td>{row.authorName}</td>
                <td>{row.groupType}</td>
                <td>{row.groupShift}</td>
                <td>{row.factory}</td>
                <td>{row.category}</td>
                <td>{row.system}</td>
                <td>{row.machine}</td>
                <td>{row.status}</td>
                <td>{row.assignee}</td>
                <td>{row.startTime}</td>
                <td>{row.endTime}</td>
                <td className="row-actions">
                  <button
                    type="button"
                    className="action-btn action-btn--edit"
                    onClick={() => onEdit(row.id)}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="action-btn action-btn--delete"
                    onClick={() => onDelete(row.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
