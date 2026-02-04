const TEAM_OPTIONS = ["ALL", "A팀", "B팀", "C팀"];
const DATE_OPTIONS = ["2026 / 01 / 27", "2026 / 01 / 26", "2026 / 01 / 25"];

export default function WorklogListHeader() {
  return (
    <div className="list-card__head">
      <h2 className="list-card__title">업무 일지 현황</h2>

      <div className="filters">
        <div className="filter">
          <span className="filter__label">작성 팀</span>
          <select className="control control--sm">
            {TEAM_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="filter">
          <span className="filter__label">날짜</span>
          <select className="control control--date">
            {DATE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
