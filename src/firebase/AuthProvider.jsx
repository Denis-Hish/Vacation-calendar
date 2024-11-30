import { useEffect, useState, createContext, useContext } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { app } from './firebaseInitialize';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(isUser => {
      if (isUser) {
        setUser(isUser);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const login = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(credentials => setUser(credentials.user))
      .catch(error => console.error(error));
  };

  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(error => console.error(error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
