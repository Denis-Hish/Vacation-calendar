import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';

function VacationCalendar({ theme, selectedDates, setSelectedDates }) {
  const ref = useRef(null);
  const [calendar, setCalendar] = useState(null);

  useEffect(() => {
    if (!ref.current) return;

    const options = {
      selectedTheme: theme,
      selectionDatesMode: 'multiple',
      onClickDate(self) {
        // console.log(self.context.selectedDates);
        setSelectedDates(self.context.selectedDates);
      },
      selectedDates: selectedDates,
    };

    setCalendar(new Calendar(ref.current, options));
  }, [ref, theme, setSelectedDates]);

  useEffect(() => {
    if (!calendar) return;
    calendar.init();
  }, [calendar, theme]);

  return <div id="calendar" ref={ref}></div>;
}

export default VacationCalendar;
