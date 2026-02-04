const ROWS = [
  {
    id: 1,
    factory: "HU1",
    system: "MES",
    room: "헝가리1,2,시...",
    detail: "업무내용",
    time: "16:09",
    owner: "홍길동",
    writer: "B조 / 이희호",
    note: "무야호",
  },
  {
    id: 2,
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "16:09",
    owner: "홍길동",
    writer: "D조 / 함태식",
    note: "무야호",
  },
  {
    id: 3,
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "16:09",
    owner: "홍길동",
    writer: "A조 / 서영석",
    note: "무야호",
  },
];

export default function WorklogListTable() {
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
            <th>조치 담당자</th>
            <th>작성자</th>
            <th>의견</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.id}>
              <td className="num">{row.id}</td>
              <td>{row.factory}</td>
              <td>{row.system}</td>
              <td className="ellipsis">{row.room}</td>
              <td>
                <span className="dot"></span>
                {row.detail}
              </td>
              <td>{row.time}</td>
              <td>{row.owner}</td>
              <td>{row.writer}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
