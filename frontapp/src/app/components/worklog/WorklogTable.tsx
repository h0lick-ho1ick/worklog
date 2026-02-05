import type { WorklogRow } from "@/app/lib/worklogFormat";

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
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          )}
          {!isLoading && errorMessage && (
            <tr>
              <td colSpan={7}>{errorMessage}</td>
            </tr>
          )}
          {!isLoading && !errorMessage && rows.length === 0 && (
            <tr>
              <td colSpan={7}>No worklogs.</td>
            </tr>
          )}
          {!isLoading &&
            !errorMessage &&
            rows.map((row) => (
              <tr key={row.id}>
                <td className="t-num">{row.id}</td>
                <td>{row.title}</td>
                <td className="t-ellipsis">{row.content}</td>
                <td>{row.writer}</td>
                <td>{row.createdDate}</td>
                <td>{row.createdTime}</td>
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
