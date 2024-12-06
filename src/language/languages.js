// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  ua: {
    translation: {
      'Quantity of vacation days:': 'Кількість днів відпустки:',
      'Remaining vacation days:': 'Залишок днів відпустки:',
      'Limit reached': 'Ви досягли максимальної кількості днів відпустки!',
      'Login in progress!': 'Виконується вхід!',
      'Reset days': 'Скидання днів',
      'Welcome to': 'Ласкаво просимо до',
      'Sign in with Google': 'Увійдіть за допомогою Google',
    },
  },
  en: {
    translation: {
      'Quantity of vacation days:': 'Quantity of vacation days:',
      'Remaining vacation days:': 'Remaining vacation days:',
      'Limit reached': 'You have reached your maximum number of vacation days!',
      'Login in progress!': 'Login in progress!',
      'Reset days': 'Reset days',
      'Welcome to': 'Welcome to',
      'Sign in with Google': 'Sign in with Google',
    },
  },
  pl: {
    translation: {
      'Quantity of vacation days:': 'Ilość dni urlopu:',
      'Remaining vacation days:': 'Pozostałe dni urlopu:',
      'Limit reached': 'Osiągnąłeś maksymalną liczbę dni urlopu!',
      'Login in progress!': 'Trwa logowanie!',
      'Reset days': 'Zresetuj dni',
      'Welcome to': 'Witamy w',
      'Sign in with Google': 'Zaloguj się za pomocą Google',
    },
  },
};

/* 
	import { useTranslation } from 'react-i18next';
	const { t } = useTranslation();
	{t('key')}
*/
