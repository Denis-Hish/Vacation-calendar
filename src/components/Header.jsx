function Header({ theme, toggleTheme }) {
  return (
    <header className="header neumorphism">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-2">
          <div className="logo"></div>
          <h1 className="app-name mb-0">VacatioN CaleNdaR</h1>
          <div className="header-buttons">
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
