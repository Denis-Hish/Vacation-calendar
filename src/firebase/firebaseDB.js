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
    console.log('Данные пользователя успешно сохранены');
  } catch (error) {
    console.error('Ошибка сохранения данных пользователя: ', error);
  }
};

export const loadUserData = async userId => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('Такого документа нет!');
      return null;
    }
  } catch (error) {
    console.error('Ошибка загрузки данных пользователя: ', error);
    return null;
  }
};
