import VacationCalendar from './components/VacationCalendar';
import VacationList from './components/VacationList';
import VacationCard from './components/VacationCard';
import RenainderCard from './components/RemainingCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from './hooks/Provider';

function App() {
  return (
    <Provider>
      <Header />
      <main>
        <div className="container">
          <div className="cards row">
            <div className="col">
              <VacationCard />
            </div>
            <div className="col">
              <RenainderCard />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <VacationCalendar />
            </div>
            <div className="col">
              <VacationList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Provider>
  );
}

export default App;
