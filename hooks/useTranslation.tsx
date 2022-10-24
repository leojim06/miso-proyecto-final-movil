import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import Storage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ITranslate } from '../constants/types';
import translations from '../constants/translations';
// import { Scope, TranslateOptions } from 'i18n-js';

export const TranslationContext = React.createContext({});

export const TranlationProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState('es');

    // Set the local once at the beginning of your app.
    const i18n = new I18n();
    i18n.locale = locale;
    i18n.translations = translations;
    i18n.enableFallback = true;
    i18n.defaultLocale = 'es';

    const t = useCallback(
        (scope, options) => {
            return i18n.t(scope, { ...options, locale });
        },
        [locale]
    );

    // get local from storage
    const getLocale = useCallback(async () => {
        const localeJSON = await Storage.getItem('locale');
        setLocale(localeJSON !== null ? localeJSON : Localization.locale);
    }, [setLocale]);

    useEffect(() => {
        getLocale();
    }, [getLocale]);

    useEffect(() => {
        Storage.setItem('locale', locale);
    }, [locale]);

    const contextValue = {
        t,
        locale,
        setLocale,
        translate: t,
    };

    return (
        <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext) as ITranslate;
