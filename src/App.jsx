import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from './hooks/Provider';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
// const Login = lazy(() => import('./pages/Login'));
import './language/translator';
import { AuthProvider, useAuth } from './firebase/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { user } = useAuth();
  return user ? <Main /> : <Login />;
};

export default App;
