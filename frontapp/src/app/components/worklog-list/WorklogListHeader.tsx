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
  const hasOptions = dateOptions.length > 0;

  return (
    <div className="list-card__head">
      <div className="list-card__head-top">
        <h2 className="list-card__title">Worklog List</h2>

        <div className="filters">
          <div className="filter">
            <span className="filter__label">Date</span>
            <select
              className="control control--date"
              value={selectedDate}
              onChange={(event) => onDateChange(event.target.value)}
              disabled={!hasOptions}
            >
              {hasOptions ? (
                dateOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))
              ) : (
                <option>No dates</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
