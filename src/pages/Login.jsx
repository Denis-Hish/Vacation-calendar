import { useAuth } from '../firebase/AuthProvider';

const Login = () => {
  const { login } = useAuth();

  return (
    <section>
      <div className="container">
        <h2 className="text-center text-primary">Login page</h2>
        <button
          type="button"
          className="login btn btn-primary text-white m-auto"
          onClick={login}
        >
          Login width Google
        </button>
      </div>
    </section>
  );
};

export default Login;
