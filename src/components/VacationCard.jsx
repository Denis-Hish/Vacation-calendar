import { useProvider } from '../hooks/Provider';
import { useTranslation } from 'react-i18next';

function VacationCard() {
  const { totalVacationDays, handleOnChangeTotalVacationDays, selectedDates } =
    useProvider();
  const { t } = useTranslation();

  return (
    <div className="card neumorphism my-4 border-0">
      <div className="card-body text-center">
        <p className="mb-0">{t('Quantity of vacation days:')}</p>

        {totalVacationDays !== undefined && selectedDates !== undefined ? (
          <input
            type="number"
            className="total-vacation-days"
            value={totalVacationDays || ''}
            onChange={handleOnChangeTotalVacationDays}
          />
        ) : (
          <h2 className="text-primary text-center">Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default VacationCard;
