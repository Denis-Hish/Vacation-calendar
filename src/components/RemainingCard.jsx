import { useTranslation } from 'react-i18next';
import { useContextProvider } from '../hooks/useContextProvider';

function RenainderCard() {
  const { totalVacationDays, totalSelectedDays } = useContextProvider();

  const { t } = useTranslation();

  return (
    <div className="card neumorphism my-4 border-0">
      <div className="card-body text-center">
        <p className="card-number mb-0">{t('Remaining vacation days:')}</p>
        <span>{totalVacationDays - totalSelectedDays}</span>
      </div>
    </div>
  );
}

export default RenainderCard;
