function RenainderCard({ selectedDates, totalVacationDays }) {
  const totalSelectedDays = selectedDates.length;

  return (
    <div className="card neumorphism m-5 border-0">
      <div className="card-body text-center">
        <p className="card-number mb-0">Остаток дней отпуска:</p>
        <span>{totalVacationDays - totalSelectedDays}</span>
      </div>
    </div>
  );
}

export default RenainderCard;
