import { useTranslation } from 'react-i18next';
import { useProvider } from '../hooks/Provider';

function RenainderCard() {
  const { totalVacationDays, totalSelectedDays, isDataLoading } = useProvider();
  const { t } = useTranslation();

  const remainingDays =
    totalVacationDays === '' ||
    totalVacationDays - totalSelectedDays < 0 ||
    totalVacationDays === undefined
      ? 0
      : totalVacationDays - totalSelectedDays;

  return (
    <div className="card neumorphism my-4 border-0">
      <div className="card-body text-center">
        <p className="card-number mb-0">{t('Remaining vacation days:')}</p>
        {isDataLoading ? (
          <p className="text-primary text-center">Loading...</p>
        ) : (
          <span>{remainingDays}</span>
        )}
      </div>
    </div>
  );
}

export default RenainderCard;
