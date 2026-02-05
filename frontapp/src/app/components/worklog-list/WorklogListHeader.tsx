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
        <h2 className="list-card__title">Worklog List</h2>

        <div className="filters">
          <div className="filter">
            <span className="filter__label">Date</span>
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
