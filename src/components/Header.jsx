import { useContextProvider } from '../hooks/useContextProvider';
import icon from '../icons/calendar-icon.png';

function Header() {
  const { theme, toggleTheme, language, handleChange } = useContextProvider();

  return (
    <header className="header neumorphism">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-2 gap-2">
          <div className="logo">
            <img src={icon} alt="Logo" />
          </div>
          <h1 className="app-name mb-0 text-center">VacatioN CaleNdaR</h1>
          <div className="header-buttons d-flex gap-2">
            <select
              className=" language-switcher btn btn-primary rounded-circle text-white"
              aria-label="Select language"
              value={language}
              onChange={handleChange}
            >
              <option value="ua">UA</option>
              <option value="en">EN</option>
              <option value="pl">PL</option>
            </select>
            <button
              type="button"
              className="btn btn-primary rounded-circle text-white"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <i className="bi bi-cloud-moon"></i>
              ) : (
                <i className="bi bi-cloud-sun"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
