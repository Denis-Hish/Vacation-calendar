import { createContext, useCallback, useEffect, useState } from 'react';

const Context = createContext();

function Provider({ children }) {
  // Определение темы устройства
  const getPreferredTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  // Получение темы из LocalStorage или определение темы устройства
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : getPreferredTheme();
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedDates, setSelectedDates] = useState(['2024-11-17']);
  const [totalVacationDays, setTotalVacationDays] = useState(20);

  /* -------------------------------------------- */
  const calendarOptions = {
    selectedTheme: theme,
    selectionDatesMode: 'multiple',
    selectedDates,
    onClickDate: useCallback(
      self => {
        if (self.context.selectedDates !== selectedDates) {
          setSelectedDates(self.context.selectedDates);
        }
      },
      [selectedDates]
    ),
  };

  // Удаления даты
  const handleRemoveDate = date => {
    setSelectedDates(selectedDates.filter(d => d !== date));
  };
  /* -------------------------------------------- */

  // console.log(selectedDates);
  // console.log(totalVacationDays);

  // Восстанавление сохранённой темы из LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
    } else {
      const preferredTheme = getPreferredTheme();
      setTheme(preferredTheme);
      document.documentElement.setAttribute('data-bs-theme', preferredTheme);
      localStorage.setItem('theme', preferredTheme);
    }
  }, []);

  // Переключения темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const value = {
    theme,
    selectedDates,
    setSelectedDates,
    totalVacationDays,
    setTotalVacationDays,
    toggleTheme,
    onRemoveDate: handleRemoveDate,
    calendarOptions,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Provider, Context };
