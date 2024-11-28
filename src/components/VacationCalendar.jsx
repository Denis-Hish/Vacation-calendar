import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useContextProvider } from '../hooks/useContextProvider';
import { useTranslation } from 'react-i18next';

function VacationCalendar() {
  const {
    selectedDates,
    setSelectedDates,
    selectedLocale,
    calendarRef,
    isLimitReached,
  } = useContextProvider();

  const { t } = useTranslation();

  return (
    <div ref={calendarRef}>
      <DayPicker
        id="calendar"
        mode="multiple"
        weekStartsOn="1"
        captionLayout="dropdown"
        locale={selectedLocale}
        selected={selectedDates}
        onSelect={setSelectedDates}
      />
      {isLimitReached ? (
        <p className="text-center text-primary" style={{ height: '24px' }}>
          {t('Limit reached')}
        </p>
      ) : (
        <p style={{ height: '24px' }}> </p>
      )}
      <button
        type="button"
        className="btn btn-primary text-white d-block m-auto"
        onClick={() => setSelectedDates([])}
      >
        RESET
      </button>
    </div>
  );
}

export default VacationCalendar;
