type WorklogListHeaderProps = {
  selectedCalendarDate: string;
  onCalendarDateChange: (value: string) => void;
};

export default function WorklogListHeader({
  selectedCalendarDate,
  onCalendarDateChange,
}: WorklogListHeaderProps) {
  return (
    <div className="list-card__head">
      <div className="list-card__head-top">
        <h2 className="list-card__title">작업일지 목록</h2>

        <div className="filters">
          <div className="filter">
            <span className="filter__label">조회 날짜</span>
            <input
              className="control control--date"
              type="date"
              value={selectedCalendarDate}
              onChange={(event) => onCalendarDateChange(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
