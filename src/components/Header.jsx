import { useEffect, useState } from 'react';
import { useContextProvider } from '../hooks/useContextProvider';
import icon from '../../public/calendar-icon.png';
import { Link } from 'react-router-dom';

function Header() {
  const { theme, toggleTheme, language, handleChange } = useContextProvider();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`header neumorphism ${isScrolled ? 'header-scrolled' : ''}`}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-2 gap-2">
          <Link to="/" className="logo">
            <img src={icon} alt="Logo" />
          </Link>
          <h1 className="app-name mb-0 text-center">VacatioN CaleNdaR</h1>
          <div className="header-buttons d-flex gap-2">
            <Link
              to="login"
              type="button"
              className="logout btn btn-primary rounded-circle text-white"
            >
              <i className="bi bi-box-arrow-left"></i>
            </Link>
            <select
              className="language-switcher btn btn-primary rounded-circle text-white"
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
