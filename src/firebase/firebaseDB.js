import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const saveUserData = async (
  userId,
  selectedDates,
  totalVacationDays
) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      selectedDates,
      totalVacationDays,
    });
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data: ', error);
  }
};

export const loadUserData = async userId => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error loading user data: ', error);
    return null;
  }
};
