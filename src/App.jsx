import VacationCalendar from './components/VacationCalendar';
import VacationList from './components/VacationList';
import VacationCard from './components/VacationCard';
import RenainderCard from './components/RemainingCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from './hooks/Provider';
import './language/translator';

function App() {
  return (
    <Provider>
      <Header />
      <main>
        <div className="container">
          <div className="cards row mt-3">
            <div className="col-12 col-md-6">
              <VacationCard />
            </div>
            <div className="col-12 col-md-6">
              <RenainderCard />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <VacationCalendar />
            </div>
            <div className="col-12 col-md-6">
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
