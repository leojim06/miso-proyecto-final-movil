import i18n from 'i18next';
import { initReactI18next} from 'react-i18next';
import { textLogin } from './textLogin';


i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: "es",
    resources: {
        es: {
            translation: {
                textLogin: textLogin,
            }
        }
    }
});

export default i18n;
