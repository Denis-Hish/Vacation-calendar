import { createContext, useEffect, useState } from 'react';

const Context = createContext();

function Provider({ children }) {
  //* ---------------- DARK / LIGHT MODE ---------------- *//
  // Определение темы устройства
  const getPreferredTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  // Получение темы из LocalStorage или определение темы устройства
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('Theme');
    return savedTheme ? savedTheme : getPreferredTheme();
  };

  const [theme, setTheme] = useState(getInitialTheme);

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
      localStorage.setItem('Theme', preferredTheme);
    }
  }, []);

  // Переключения темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  //* --------------------------------------------------- *//

  //* ---------- SELECTING DAYS IN THE CALENDAR ---------- *//
  // Получение сохранённых дат из LocalStorage
  const getInitialSelectedDates = () => {
    const savedDates = localStorage.getItem('Selected dates');
    return savedDates ? JSON.parse(savedDates) : []; // Преобразуем строку обратно в массив
  };

  // Получение сохранённого числа дней отпуска из LocalStorage
  const getInitialTotalVacationDays = () => {
    const savedDays = localStorage.getItem('Vacation days');
    return savedDays ? parseInt(savedDays, 10) : 20; // Преобразуем строку в число, по умолчанию 20
  };

  const [selectedDates, setSelectedDates] = useState(getInitialSelectedDates);
  const [totalVacationDays, setTotalVacationDays] = useState(
    getInitialTotalVacationDays
  );

  // Сохранение выбранных дат в LocalStorage
  useEffect(() => {
    localStorage.setItem('Selected dates', JSON.stringify(selectedDates)); // Сохраняем массив в виде строки
  }, [selectedDates]);

  // Сохранение `totalVacationDays` в localStorage при его изменении
  useEffect(() => {
    localStorage.setItem('Vacation days', totalVacationDays); // Сохраняем число в виде строки
  }, [totalVacationDays]);

  // Удаление выбранной даты
  const handleRemoveDate = date => {
    setSelectedDates(selectedDates.filter(d => d !== date));
  };
  //* --------------------------------------------------- *//

  const value = {
    theme,
    selectedDates,
    setSelectedDates,
    totalVacationDays,
    setTotalVacationDays,
    toggleTheme,
    onRemoveDate: handleRemoveDate,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Provider, Context };
