import { useEffect, useState, createContext, useContext } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './firebaseConfig';
import toast from 'react-hot-toast';
import { t } from 'i18next';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
      toast.success(
        <>
          {t('Welcome')} &nbsp;{' '}
          <strong>{response.user.displayName || response.user.email}</strong>
        </>
      );
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('Login error'));
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
