import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function PrivateRoute({ isLogined }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogined) {
      navigate('/login'); // Перенаправляем на страницу логина, если пользователь не авторизован
    }
  }, [isLogined, navigate]);

  return isLogined ? <Outlet /> : null; // Показываем дочерние маршруты, если авторизован
}

export default PrivateRoute;
