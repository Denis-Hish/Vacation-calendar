import {} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsLogined }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
    setIsLogined(true);
    // Перенаправляем на главную страницу
    console.log('You are logged in!');
  };

  return (
    <main>
      <div className="container">
        <h2 className="text-center text-primary">Login page</h2>
        <Link
          to="/"
          type="button"
          className="login btn btn-primary text-white m-auto"
          onClick={handleLogin}
        >
          Login
        </Link>
      </div>
    </main>
  );
};

export default Login;
