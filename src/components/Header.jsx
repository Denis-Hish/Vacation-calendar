import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProvider } from '../hooks/Provider';
import icon from '../../public/calendar-icon.png';
import { useAuth } from '../firebase/AuthProvider';

function Header() {
  const { theme, toggleTheme, language, handleChange } = useProvider();
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout, user, loading } = useAuth();

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
          <div className="header-buttons d-flex align-items-center gap-2">
            {user?.displayName ? (
              <strong className="user-name mb-0">{user.displayName}</strong>
            ) : user?.email ? (
              user.email
            ) : (
              ''
            )}

            {!loading ? (
              <>
                {user?.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                ) : (
                  ''
                )}
              </>
            ) : (
              'Loading...' //! DELETE !
            )}

            {user && (
              <button
                type="button"
                className="logout btn btn-primary rounded-circle text-white"
                onClick={() => logout()}
              >
                <i className="bi bi-box-arrow-left"></i>
              </button>
            )}

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
