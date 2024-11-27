import { DayPicker } from 'react-day-picker';
import { uk } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { useContextProvider } from '../hooks/useContextProvider';

function VacationCalendar() {
  const { selectedDates, setSelectedDates, totalVacationDays } =
    useContextProvider();
  // const locale = navigator.language;

  console.log('selectedDates -', selectedDates.length);
  // console.log(totalVacationDays);

  if (selectedDates.length >= totalVacationDays) {
    console.log('You have reached the maximum number of vacation days.');
  }

  return (
    <DayPicker
      id="calendar"
      mode="multiple"
      weekStartsOn="1"
      // captionLayout="dropdown"
      locale={uk}
      selected={selectedDates}
      onSelect={setSelectedDates}
    />
  );
}

export default VacationCalendar;
