import { useState } from 'react';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = ({ onLanguageChange }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'ru-RU');

    const handleChange = (lang) => {
        setLanguage(lang);
        onLanguageChange(lang);
    };

    return (
        <div className={styles.switcher}>
            <button
                className={`${styles.button} ${language === 'en-US' ? styles.active : ''}`}
                onClick={() => handleChange('en-US')}
            >
                EN
            </button>
            <button
                className={`${styles.button} ${language === 'ru-RU' ? styles.active : ''}`}
                onClick={() => handleChange('ru-RU')}
            >
                RU
            </button>
        </div>
    );
};

export default LanguageSwitcher;