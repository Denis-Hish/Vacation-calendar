import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const saveUserData = async (
  userId,
  selectedDates,
  totalVacationDays
) => {
  try {
    if (typeof totalVacationDays === 'undefined') {
      throw new Error('totalVacationDays не может быть undefined');
    }

    await setDoc(doc(db, 'users', userId), {
      selectedDates,
      totalVacationDays,
    });
    console.log('User data is successfully saved');
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
      console.log('There is no such document!');
      return null;
    }
  } catch (error) {
    console.error('Error loading user data: ', error);
    return null;
  }
};
