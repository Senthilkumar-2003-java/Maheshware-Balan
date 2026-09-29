import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languageList } from '../translations/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Read saved language from localStorage or default to 'en'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('mbmct_lang') || 'en';
  });

  // Country/regional context
  const [regionInfo, setRegionInfo] = useState({
    country: 'India',
    locale: 'en-IN',
    currency: 'INR',
    currencySymbol: '₹',
  });

  useEffect(() => {
    // Detect country and regional locale
    try {
      const winRegion = window.__REGION_INFO__ || {};
      const tz = winRegion.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const browserLang = winRegion.userBrowserLang || navigator.language || 'en';

      let country = 'India';
      let locale = 'en-IN';
      let currency = 'INR';
      let currencySymbol = '₹';

      if (tz.includes('Singapore') || browserLang.includes('SG')) {
        country = 'Singapore';
        locale = 'en-SG';
        currency = 'SGD';
        currencySymbol = 'S$';
      } else if (tz.includes('Australia') || tz.includes('Sydney') || tz.includes('Melbourne') || browserLang.includes('AU')) {
        country = 'Australia';
        locale = 'en-AU';
        currency = 'AUD';
        currencySymbol = 'A$';
      } else if (tz.includes('London') || browserLang.includes('GB')) {
        country = 'United Kingdom';
        locale = 'en-GB';
        currency = 'GBP';
        currencySymbol = '£';
      } else if (tz.includes('America') || browserLang.includes('US')) {
        country = 'United States';
        locale = 'en-US';
        currency = 'USD';
        currencySymbol = '$';
      }

      setRegionInfo({ country, locale, currency, currencySymbol });
    } catch (e) {
      console.warn('Locale detection fallback:', e);
    }
  }, []);

  const setLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
      localStorage.setItem('mbmct_lang', langCode);
      document.documentElement.lang = langCode;
    }
  };

  // Translation helper function
  const t = (key) => {
    const currentDict = translations[language] || translations.en;
    return currentDict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languageList,
        regionInfo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
