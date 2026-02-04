const ROWS = [
  {
    id: 1,
    factory: "HU1",
    system: "MES",
    room: "헝가리1,2,시...",
    detail: "업무내용",
    time: "07:09",
    owner: "홍길동",
    team: "B조 / 이희호",
    note: "무야호",
  },
  {
    id: 2,
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "08:10",
    owner: "홍길동",
    team: "B조 / 문호찬",
    note: "무야호",
  },
  {
    id: 3,
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "08:11",
    owner: "홍길동",
    team: "B조 / 이희호",
    note: "무야호",
  },
  {
    id: 4,
    factory: "HU1",
    system: "MES",
    room: "헝가리1,2,시...",
    detail: "업무내용",
    time: "09:50",
    owner: "홍길동",
    team: "B조 / 이희호",
    note: "무야호",
  },
  {
    id: 5,
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "10:00",
    owner: "홍길동",
    team: "B조 / 문호찬",
    note: "무야호",
  },
  {
    id: 6,
    factory: "CA",
    system: "MES",
    room: "천안 IT 상황...",
    detail: "업무내용",
    time: "10:20",
    owner: "홍길동",
    team: "B조 / 이희호",
    note: "무야호",
  },
];

const PAGES = [1, 2, 3, 4, 5];

export default function WorklogTable() {
  return (
    <div className="table-wrap">
      <table className="table">
        <tbody>
          {ROWS.map((row) => (
            <tr key={`${row.id}-${row.time}`}>
              <td className="t-num">{row.id}</td>
              <td>{row.factory}</td>
              <td>{row.system}</td>
              <td className="t-ellipsis">{row.room}</td>
              <td>{row.detail}</td>
              <td>{row.time}</td>
              <td>{row.owner}</td>
              <td>{row.team}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pager">
        {PAGES.map((page) => (
          <button
            className={`pager__btn${page === 1 ? " is-active" : ""}`}
            type="button"
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
