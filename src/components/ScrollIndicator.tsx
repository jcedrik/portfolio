import React from 'react';
import { useTranslation } from 'react-i18next';
import './ScrollIndicator.css';

const ScrollIndicator: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="scroll-indicator">
      <span className="scroll-text">{t('hero.scrollDown')}</span>
      <div className="scroll-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ScrollIndicator;