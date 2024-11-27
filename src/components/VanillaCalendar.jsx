import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';
import { useContextProvider } from '../hooks/useContextProvider';

function VanillaCalendar() {
  const ref = useRef(null);
  const [calendar, setCalendar] = useState(null);
  const { theme, selectedDates, setSelectedDates } = useContextProvider();

  // console.log(options.selectedTheme);

  useEffect(() => {
    if (!ref.current) return;
    const options = {
      selectedTheme: theme,
      selectionDatesMode: 'multiple',
      selectedDates: ['2024-11-30', new Date()],
      selectedHolidays: ['2024-11-13'],
      locale: 'uk-UA',
    };
    console.log('Calendar set');
    setCalendar(new Calendar(ref.current, options));
  }, [ref, theme]);

  useEffect(() => {
    if (!calendar) return;
    calendar.init();
    console.log('Calendar init');
  }, [calendar]);

  useEffect(() => {
    if (!calendar) return;
    const options = {
      selectedTheme: theme,
      onClickDate(self, event) {
        console.log('Clicked date', self.context.selectedDates);
      },
    };
    console.log('Calendar updated');
    calendar.set({ options });
  }, [calendar, theme]);

  return <div id="calendar" ref={ref}></div>;
}

export default VanillaCalendar;

/*
// const locale = navigator.language;

  // const handleClickDate = useCallback(
  //   self => {
  //     setSelectedDates(self.context.selectedDates);
  //     console.log(self.context.selectedDates);
  //   },
  //   [selectedDates]
  // );

  // const calendarOptions = {
  //   selectedTheme: theme,
  //   selectionDatesMode: 'multiple',
  //   selectedDates,
  //   // onClickDate(self) {
  //   //   // console.log(self.context.selectedDates);
  //   //   // setSelectedDates(self.context.selectedDates);
  //   //   const updatedDates = self.context.selectedDates;
  //   //   setSelectedDates([...updatedDates]);
  //   //   console.log('Updated dates:', updatedDates);
  //   // },
  //   // onClickDate: useCallback(
  //   //   self => {
  //   //     if (self.context.selectedDates !== selectedDates) {
  //   //       setSelectedDates(self.context.selectedDates);
  //   //     }
  //   //   },
  //   //   [selectedDates]
  //   // ),
  //   // locale: 'uk-UA',
  //   selectedHolidays: ['2024-11-13'],
  // };
*/
