import { useEffect, useState } from 'react';
import VacationCalendar from './components/VacationCalendar';
import VacationList from './components/VacationList';
import VacationCard from './components/VacationCard';
import RenainderCard from './components/RenainderCard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // Определяем тему устройства пользователя
  const getPreferredTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  // Функция для получения темы из LocalStorage или определения темы устройства
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : getPreferredTheme();
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedDates, setSelectedDates] = useState([]);
  const [totalVacationDays, setTotalVacationDays] = useState(20);

  // console.log(selectedDates);
  // console.log(totalVacationDays);

  // При загрузке страницы восстанавливаем сохранёную тему из LocalStorage
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

  // Функция переключения темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Функция удаления даты
  const removeDate = date => {
    setSelectedDates(selectedDates.filter(d => d !== date));
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <div className="container">
          <div className="cards row">
            <div className="col">
              <VacationCard
                totalVacationDays={totalVacationDays}
                setTotalVacationDays={setTotalVacationDays}
              />
            </div>
            <div className="col">
              <RenainderCard
                selectedDates={selectedDates}
                totalVacationDays={totalVacationDays}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <VacationCalendar
                theme={theme}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
            </div>
            <div className="col">
              <VacationList
                selectedDates={selectedDates}
                removeDate={removeDate}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
