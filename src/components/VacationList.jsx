import { useProvider } from '../hooks/Provider';

function VacationList() {
  const { selectedDates, onRemoveDate } = useProvider();

  const formatDate = isoDate => {
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  return (
    <ul className="vacation-list">
      {selectedDates.map((date, index) => (
        <li className="vacation-item neumorphism" key={index}>
          <div className="date">{formatDate(date)}</div>
          <button
            type="button"
            className="remove-btn btn-close rounded-circle"
            aria-label="Close"
            onClick={() => onRemoveDate(date)}
          ></button>
        </li>
      ))}
    </ul>
  );
}

export default VacationList;
