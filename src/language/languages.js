// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

import ua from './ua.json';
import en from './en.json';
import pl from './pl.json';

export const resources = {
  ua: { translation: ua },
  en: { translation: en },
  pl: { translation: pl },
};

/* 
	import { useTranslation } from 'react-i18next';
	const { t } = useTranslation();
	{t('key')}
*/
