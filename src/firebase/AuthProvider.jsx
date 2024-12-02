import { useEffect, useState, createContext, useContext } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { app } from './firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(isUser => {
      if (isUser) {
        setUser(isUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  console.log(auth);

  const login = () => {
    signInWithPopup(auth, provider)
      .then(credentials => setUser(credentials.user))
      .catch(error => console.error(error));
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
