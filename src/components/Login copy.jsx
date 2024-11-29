import { auth, provider, signInWithPopup } from '../firebaseConfig';

const Login = () => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log('User logged in:', user);
        // Сохраните данные пользователя в Firestore или используйте их дальше
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
    <button
      type="button"
      className="login btn btn-primary text-white"
      onClick={handleLogin}
    >
      Login with Google
    </button>
  );
};

export default Login;
