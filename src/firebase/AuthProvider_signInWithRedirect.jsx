import { useEffect, useState, createContext, useContext } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth';
import { app } from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  console.log(auth);

  //! Стабильная версия !//

  useEffect(() => {
    // Обработка результата редиректа
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        console.log('Redirect result:', result);

        if (result && result.user) {
          // Пользователь успешно авторизован
          setUser(result.user);
          console.log('User:', result.user);
        } else {
          console.log('No user returned from getRedirectResult.');
        }
      } catch (error) {
        console.error('Error during getRedirectResult:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    checkRedirectResult();
  }, [auth]);

  const login = async () => {
    try {
      setLoadingUser(true);
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
      setLoadingUser(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
