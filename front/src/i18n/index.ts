import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../i18n/en.json'
import fr from '../i18n/fr.json'
import nl from '../i18n/nl.json'

i18n
    .use(LanguageDetector) // detect language of the browser
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation : en },
            fr: { translation : fr },
            nl: { translation : nl },
        },
        fallbackLng: 'en' , // default language
        interpolation: {
            escapeValue: false,
        },
    });

// Keep <html lang> in sync with the active language (accessibility + SEO)
const syncHtmlLang = (lng?: string) => {
    if (lng) document.documentElement.lang = lng.split('-')[0];
};
syncHtmlLang(i18n.resolvedLanguage);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
