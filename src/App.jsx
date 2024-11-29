import { lazy, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from './hooks/Provider';
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
// const Login = lazy(() => import('./pages/Login'));
import './language/translator';
import PrivateRoute from './hooks/PrivateRoute';

function App() {
  const [isLogined, setIsLogined] = useState(true);
  console.log(isLogined);

  return (
    <Provider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute isLogined={isLogined} />}>
            <Route index element={<Main />} />
          </Route>
          <Route
            path="/login"
            element={<Login setIsLogined={setIsLogined} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
