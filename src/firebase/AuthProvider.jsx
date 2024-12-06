import { useEffect, useState, createContext, useContext } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // console.log(user?.photoURL);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async () => {
    setLoadingUser(true);
    try {
      const response = await signInWithPopup(auth, provider);
      if (!response.user) return;
      setUser(response.user);
      // console.log(response);
    } catch (error) {
      console.error('Login error:', error);
      //TODO: отображение ошибки для пользователя
    } finally {
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
