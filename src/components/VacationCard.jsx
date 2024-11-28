import { useContextProvider } from '../hooks/useContextProvider';
import { useTranslation } from 'react-i18next';

function VacationCard() {
  const { totalVacationDays, handleOnChangeTotalVacationDays } =
    useContextProvider();
  const { t } = useTranslation();

  return (
    <div className="card neumorphism m-5 border-0">
      <div className="card-body text-center">
        <p className="mb-0">{t('Quantity of vacation days:')}</p>
        <input
          type="number"
          className="total-vacation-days"
          value={totalVacationDays}
          onChange={handleOnChangeTotalVacationDays}
        />
      </div>
    </div>
  );
}

export default VacationCard;
