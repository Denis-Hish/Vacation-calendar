import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enUS, uk, pl } from 'react-day-picker/locale';
import { DEFAULT_NUMBER_VACATION_DAYS } from '../config';
import { useAuth } from '../firebase/AuthProvider';
import { loadUserData, saveUserData } from '../firebase/firebaseDB';

const Context = createContext();

function Provider({ children }) {
  const { user } = useAuth();
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
  const [selectedDates, setSelectedDates] = useState([]);
  const [totalVacationDays, setTotalVacationDays] = useState(undefined);
  const totalSelectedDays = selectedDates.length;
  const [isDataLoading, setDataLoading] = useState(false);

  console.log(selectedDates);
  console.log(totalVacationDays);

  // Функция для преобразования меток времени из Firestore в объект Date
  const convertDates = timestamps => {
    return timestamps.map(timestamp => new Date(timestamp.seconds * 1000));
  };

  // Загрузка данных из FireStore
  useEffect(() => {
    const fetchDataDB = async () => {
      if (user) {
        setDataLoading(true);
        const data = await loadUserData(user.email);
        if (data.totalVacationDays === null) {
          setTotalVacationDays(DEFAULT_NUMBER_VACATION_DAYS);
          setSelectedDates([]);
        } else {
          setTotalVacationDays(data.totalVacationDays);
          setSelectedDates(convertDates(data.selectedDates));
        }
        setDataLoading(false);
      } else {
        setSelectedDates([]);
        setTotalVacationDays(undefined);
      }
    };
    fetchDataDB();
  }, [user]);

  // Сохранение данных в FireStore
  useEffect(() => {
    if (user) {
      saveUserData(user.email, selectedDates, totalVacationDays);
    }
  }, [user, selectedDates, totalVacationDays]);

  // Удаление выбранной даты
  const handleRemoveDate = date => {
    setSelectedDates(selectedDates.filter(d => d !== date));
  };

  // Блокировка выбора даты при достижении лимита
  const calendarRef = useRef(null);

  const formattedDates = selectedDates.map(date =>
    new Date(date).toLocaleDateString('en-CA')
  );

  useEffect(() => {
    if (calendarRef.current) {
      const buttons = calendarRef.current.querySelectorAll('.rdp-day_button');
      const buttonDates = Array.from(buttons).map(button => {
        const parentTd = button.closest('.rdp-day');
        return parentTd ? parentTd.getAttribute('data-day') : null;
      });

      buttons.forEach((button, index) => {
        const buttonDate = buttonDates[index];

        // Если лимит достигнут и дата не входит в formattedDates, добавляем класс "disabled-btn"
        if (
          formattedDates.length >= totalVacationDays &&
          !formattedDates.includes(buttonDate)
        ) {
          button.classList.add('disabled-btn');
        } else {
          button.classList.remove('disabled-btn');
        }
      });
    }
  }, [totalVacationDays, formattedDates]);

  // Сообщение о достижении максимального количества дней отпуска
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    if (selectedDates.length >= totalVacationDays) {
      setIsLimitReached(true);
    } else {
      setIsLimitReached(false);
    }
  }, [selectedDates, totalVacationDays]);

  // Блокировка изменения количества дней отпуска, если результат выражения меньше 0
  const handleOnChangeTotalVacationDays = e => {
    if (e.target.value === '') {
      setTotalVacationDays('');
      return;
    }
    const newVacationDays = parseInt(e.target.value, 10);
    if (newVacationDays >= totalSelectedDays) {
      setTotalVacationDays(newVacationDays);
    }
  };
  //* --------------------------------------------------- *//

  //* ------------------- TRANSLATOR ------------------- *//
  const { i18n } = useTranslation();

  // Определение языка устройства пользователя
  const getBrowserLanguage = () => {
    const language = navigator.language || navigator.userLanguage;
    const langCode = language.toLowerCase();
    if (langCode.startsWith('ru') || langCode.startsWith('uk')) {
      return 'ua';
    } else if (langCode.startsWith('pl')) {
      return 'pl';
    } else {
      return 'en';
    }
  };

  const getInitialLanguage = () => {
    return localStorage.getItem('Language') || getBrowserLanguage();
  };

  const [language, setLanguage] = useState(getInitialLanguage());

  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase());
  }, [language, i18n]);

  const handleChange = event => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toLowerCase());
    localStorage.setItem('Language', newLanguage);
  };

  // Перевод календаря
  const [selectedLocale, setSelectedLocale] = useState(language);
  useEffect(() => {
    if (language === 'ua') {
      setSelectedLocale(uk);
    } else if (language === 'pl') {
      setSelectedLocale(pl);
    } else {
      setSelectedLocale(enUS);
    }
  }, [language]);
  //* -------------------------------------------------- *//

  const value = {
    theme,
    selectedDates,
    setSelectedDates,
    totalSelectedDays,
    totalVacationDays,
    setTotalVacationDays,
    toggleTheme,
    onRemoveDate: handleRemoveDate,
    language,
    handleChange,
    selectedLocale,
    calendarRef,
    isLimitReached,
    handleOnChangeTotalVacationDays,
    isDataLoading,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useProvider() {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error('Context was used outside of the Provider');

  return context;
}

export { Provider, useProvider };
