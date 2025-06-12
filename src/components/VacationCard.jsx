import { useProvider } from '../hooks/Provider';
import { useTranslation } from 'react-i18next';

function VacationCard() {
  const { totalVacationDays, handleOnChangeTotalVacationDays, isDataLoading } =
    useProvider();
  const { t } = useTranslation();

  // Выделение текста при фокусе
  const handleFocus = event => {
    event.target.select();
  };

  return (
    <div className='card neumorphism my-4 border-0'>
      <div className='card-body text-center'>
        <p className='mb-0'>{t('Quantity of vacation days:')}</p>

        {isDataLoading ? (
          <p className='text-primary text-center'>Loading...</p>
        ) : (
          <input
            type='number'
            className='total-vacation-days'
            value={totalVacationDays || ''}
            onChange={handleOnChangeTotalVacationDays}
            onFocus={handleFocus}
          />
        )}
      </div>
    </div>
  );
}

export default VacationCard;
