import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import toast from 'react-hot-toast';
import { t } from 'i18next';

export const saveUserData = async (
  userId,
  selectedDates,
  totalVacationDays
) => {
  try {
    if (typeof totalVacationDays === 'undefined') {
      throw new Error('totalVacationDays не может быть undefined');
    }

    // Создаем ссылку на документ пользователя
    const userDocRef = doc(db, 'users', userId);

    // Получаем текущие данные из Firestore
    const docSnap = await getDoc(userDocRef);
    let currentData = null;
    if (docSnap.exists()) {
      currentData = docSnap.data();
    }

    // Преобразуем selectedDates в строки ISO для сравнения
    const newSelectedDatesStr = selectedDates.map(d => d.toISOString()).sort();
    const currentSelectedDatesStr =
      currentData?.selectedDates
        ?.map(ts => new Date(ts.seconds * 1000).toISOString())
        .sort() || [];
    const isDatesEqual =
      JSON.stringify(newSelectedDatesStr) ===
      JSON.stringify(currentSelectedDatesStr);
    const isVacationDaysEqual =
      currentData?.totalVacationDays === totalVacationDays;

    // Если данные не изменились, пропускаем сохранение и вывод сообщения
    if (isDatesEqual && isVacationDaysEqual) {
      // console.log('Data not changed, save skipped');
      return;
    }

    // Сохраняем данные, если есть изменения
    await setDoc(doc(db, 'users', userId), {
      selectedDates,
      totalVacationDays,
    });
    console.log('User data is successfully saved');
    toast.success(t('User data is successfully saved'));
  } catch (error) {
    console.error('Error saving user data: ', error);
    toast.error(t('Error saving user data'));
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
