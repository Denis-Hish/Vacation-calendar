import { useEffect, useState, createContext, useContext, useRef } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
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
  const prevUserRef = useRef(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoadingUser(false);

      if (!prevUserRef.current && currentUser && !isInitialLoad.current) {
        toast.success(
          <>
            {t('Welcome')} &nbsp;
            <strong>{currentUser.displayName || currentUser.email}</strong>
          </>
        );
      }
      prevUserRef.current = currentUser;
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async () => {
    setLoadingUser(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('Login error'));
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
