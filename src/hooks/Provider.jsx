import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { enUS, uk, pl } from 'react-day-picker/locale';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../firebase/AuthProvider';
import { loadUserData, saveUserData } from '../firebase/firebaseDB';
import { DEFAULT_VACATION_DAYS } from '../config';
import { t } from 'i18next';

const Context = createContext();

function Provider({ children }) {
  const { user } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 767 });
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
  const [totalVacationDays, setTotalVacationDays] = useState(null);
  const totalSelectedDays = selectedDates.length;
  const [isDataLoading, setDataLoading] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const prevSelectedDatesLengthRef = useRef(0);

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

        if (data === null) {
          // Устанавливаем значения по умолчанию
          const defaultDates = [];
          const defaultDays = DEFAULT_VACATION_DAYS;

          setTotalVacationDays(defaultDays);
          setSelectedDates(defaultDates);

          // Сохраняем в базу
          await saveUserData(user.email, defaultDates, defaultDays);
        } else {
          // Загружаем данные из базы
          setTotalVacationDays(data.totalVacationDays);
          setSelectedDates(convertDates(data.selectedDates));
        }
        setInitialized(true); // Флаг, что инициализация завершена
        setDataLoading(false);
      } else {
        setSelectedDates([]);
        setTotalVacationDays(null); // Обнуляем, если нет пользователя
        setInitialized(false); // Сбрасываем флаг
      }
    };

    fetchDataDB();
  }, [user]);

  // console.log(user);

  // Сохранение данных в FireStore
  useEffect(() => {
    if (user && isInitialized && !isDataLoading) {
      saveUserData(user.email, selectedDates, totalVacationDays);
    }
  }, [user, selectedDates, totalVacationDays, isDataLoading, isInitialized]);

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

  // useEffect(() => {
  //   if (selectedDates.length >= totalVacationDays) {
  //     setIsLimitReached(true);
  //   } else {
  //     setIsLimitReached(false);
  //   }
  // }, [selectedDates, totalVacationDays]);

  // Уведомление о достижении лимита
  useEffect(() => {
    const currentLength = selectedDates.length;
    if (
      currentLength > prevSelectedDatesLengthRef.current &&
      currentLength >= totalVacationDays
    ) {
      setIsLimitReached(true);
      toast.error(t('Limit reached'));
    } else if (currentLength < totalVacationDays) {
      setIsLimitReached(false);
    }
    prevSelectedDatesLengthRef.current = currentLength;
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

  //* ---------------- SETTINGS TOASTER --------------- *//
  const toastConfig = {
    position: isMobile ? 'bottom-center' : 'bottom-right',

    containerStyle: { bottom: '60px' },

    toastOptions: {
      className: 'hot-toast',
      duration: 5000,

      style: {
        fontSize: '18px',
        color: 'var(--bs-body-color)',
        borderRadius: 'var(--rounded)',
        backgroundColor: 'var(--neo-bg)',
        boxShadow:
          '5px 5px 5px var(--neo-shadow1), -5px -5px 5px var(--neo-shadow2)',
        margin: '6px 0',
      },
    },
  };
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

  return (
    <Context.Provider value={value}>
      {children}
      <Toaster {...toastConfig} />
    </Context.Provider>
  );
}

function useProvider() {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error('Context was used outside of the Provider');

  return context;
}

export { Provider, useProvider };
