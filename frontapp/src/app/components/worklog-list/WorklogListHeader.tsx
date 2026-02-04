const TEAM_OPTIONS = ["ALL", "A조", "B조", "C조", "D조"];

type WorklogListHeaderProps = {
  dateOptions: string[];
  selectedDate: string;
  onDateChange: (value: string) => void;
};

export default function WorklogListHeader({
  dateOptions,
  selectedDate,
  onDateChange,
}: WorklogListHeaderProps) {
  return (
    <div className="list-card__head">
      <div className="list-card__head-top">
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
            <select
              className="control control--date"
              value={selectedDate}
              onChange={(event) => onDateChange(event.target.value)}
            >
              {dateOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
