import GoogleButton from '../components/GoogleButton';
import { t } from 'i18next';

const Login = () => {
  return (
    <section
      id="login"
      className=" d-flex align-items-center justify-content-center h-100"
    >
      <div className="container h-100">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center text-white mb-0">
            {t('Welcome to')}
            <br />
            <span className="app-name my-3 d-inline-block text-primary">
              VacatioN CaleNdaR
            </span>
          </h2>
          <small className="text-center text-white mt-3 mb-2">
            {t('Sign in with')}
          </small>
          <GoogleButton />
        </div>
      </div>
    </section>
  );
};

export default Login;
