import RenainderCard from '../components/RemainingCard';
import VacationCalendar from '../components/VacationCalendar';
import VacationCard from '../components/VacationCard';
import VacationList from '../components/VacationList';

function Main() {
  return (
    <section id="main">
      <div className="container">
        <div className="cards row mt-3 justify-content-around">
          <div className="col col-12 col-md-6 p-0">
            <VacationCard />
          </div>
          <div className="col col-12 col-md-6 p-0">
            <RenainderCard />
          </div>
        </div>

        <div className="cards row justify-content-around">
          <div className="col col-12 col-md-6">
            <VacationCalendar />
          </div>
          <div className="col col-12 col-md-6">
            <VacationList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
