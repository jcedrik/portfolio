import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  
  const switchLanguage = () => {
    const currentLang = i18n.language?.substring(0, 2) || 'en';
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    window.location.reload();
  };

  return (
    <button 
      className="language-switcher"
      onClick={switchLanguage}
      aria-label="Switch language"
    >
      {t('language.switchTo')}
    </button>
  );
}