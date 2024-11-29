import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const saveUserToFirestore = async user => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: new Date(),
  });
};
