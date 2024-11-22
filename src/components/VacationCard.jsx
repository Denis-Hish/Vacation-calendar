import { useContextProvider } from '../hooks/useContextProvider';

function VacationCard() {
  const { totalVacationDays, setTotalVacationDays } = useContextProvider();

  return (
    <div className="card neumorphism m-5 border-0">
      <div className="card-body text-center">
        <p className="mb-0">Quantity of vacation days:</p>
        <input
          type="number"
          className="total-vacation-days"
          value={totalVacationDays}
          onChange={e => setTotalVacationDays(e.target.value)}
        />
      </div>
    </div>
  );
}

export default VacationCard;
