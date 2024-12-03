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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, provider);
      if (!response.user) return;
      setUser(response.user);
      console.log(response);
    } catch (error) {
      console.error('Login error:', error);
      //TODO: отображение ошибки для пользователя
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(error => console.error(error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
