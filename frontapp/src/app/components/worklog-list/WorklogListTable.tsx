type WorklogRow = {
  id: number;
  factory: string;
  system: string;
  room: string;
  detail: string;
  time: string;
  completionTime: string;
  status: string;
  owner: string;
  writer: string;
  note: string;
};

type WorklogListTableProps = {
  rows: WorklogRow[];
};

export default function WorklogListTable({ rows }: WorklogListTableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>no</th>
            <th>공장</th>
            <th>시스템</th>
            <th>메신저 방</th>
            <th>업무내용</th>
            <th>발생시간</th>
            <th>완료시간</th>
            <th>상태</th>
            <th>조치 담당자</th>
            <th>작성자</th>
            <th>의견</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="table-row">
              <td className="num">{row.id}</td>
              <td>{row.factory}</td>
              <td>{row.system}</td>
              <td className="ellipsis">{row.room}</td>
              <td>
                <span className="dot"></span>
                {row.detail}
              </td>
              <td>{row.time}</td>
              <td>{row.completionTime}</td>
              <td>{row.status}</td>
              <td>{row.owner}</td>
              <td>{row.writer}</td>
              <td>{row.note}</td>
              <td className="row-actions">
                <button type="button" className="action-btn action-btn--edit">
                  수정
                </button>
                <button type="button" className="action-btn action-btn--delete">
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
