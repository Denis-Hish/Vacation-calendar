import { HashRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './firebase/AuthProvider';
import { Provider } from './hooks/Provider';
import './language/translator';

import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
// const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <AuthProvider>
      <Provider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </HashRouter>
      </Provider>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { user, loadingUser } = useAuth();
  const { t } = useTranslation();

  if (loadingUser) {
    return (
      <section className="text-center">
        <h2 className="text-primary">{t('Login in progress!')}</h2>
      </section>
    );
  }

  return user ? <Main /> : <Login />;
};

export default App;
