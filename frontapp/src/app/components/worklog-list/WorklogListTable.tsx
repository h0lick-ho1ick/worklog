type WorklogRow = {
  id: number;
  writer: string;
  title: string;
  content: string;
  createdDate: string;
  createdTime: string;
};

type WorklogListTableProps = {
  rows: WorklogRow[];
  isLoading: boolean;
  errorMessage?: string | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function WorklogListTable({
  rows,
  isLoading,
  errorMessage,
  onEdit,
  onDelete,
}: WorklogListTableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>no</th>
            <th>title</th>
            <th>content</th>
            <th>writer</th>
            <th>date</th>
            <th>time</th>
            <th></th>
          </tr>
        </thead>
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
              <tr key={row.id} className="table-row">
                <td className="num">{row.id}</td>
                <td>{row.title}</td>
                <td className="ellipsis">{row.content}</td>
                <td>{row.writer}</td>
                <td>{row.createdDate}</td>
                <td>{row.createdTime}</td>
                <td className="row-actions">
                  <button
                    type="button"
                    className="action-btn action-btn--edit"
                    onClick={() => onEdit(row.id)}
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    className="action-btn action-btn--delete"
                    onClick={() => onDelete(row.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
