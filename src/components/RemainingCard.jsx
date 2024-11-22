import { useContextProvider } from '../hooks/useContextProvider';

function RenainderCard() {
  const { selectedDates, totalVacationDays } = useContextProvider();
  const totalSelectedDays = selectedDates.length;

  return (
    <div className="card neumorphism m-5 border-0">
      <div className="card-body text-center">
        <p className="card-number mb-0">Remaining vacation days:</p>
        <span>{totalVacationDays - totalSelectedDays}</span>
      </div>
    </div>
  );
}

export default RenainderCard;
