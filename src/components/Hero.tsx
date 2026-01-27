import { useTranslation } from 'react-i18next';
import TextType from './Texttype';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  
  // Get the roles array from translations
  const roles = t('hero.roles', { returnObjects: true }) as string[];

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-title">
          <TextType 
            text={roles}
            typingSpeed={75}
            pauseDuration={2000}
            deletingSpeed={50}
            showCursor={false}
            loop={true}
            className="hero-typing"
          />
        </div>
      </div>
    </div>
  );
}