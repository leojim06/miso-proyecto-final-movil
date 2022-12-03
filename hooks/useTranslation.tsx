import i18n, { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import Storage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ILanguageProps, ITranslate } from '../constants/types';
import translations from '../constants/translations';
// import { Scope, TranslateOptions } from 'i18n-js';

export const TranslationContext = React.createContext({});

export const TranlationProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState('es');

    // Set the local once at the beginning of your app.
    const i18n = new I18n();
    i18n.defaultLocale = 'es';
    i18n.locale = locale;
    i18n.translations = translations;
    i18n.enableFallback = true;
    i18n.defaultLocale = 'es';

    const [languages, setLanguages] = useState<ILanguageProps[]>([
        { label: i18n.t('profile.label.spanish'), id: 0, locale: 'es', active: false },
        { label: i18n.t('profile.label.portuguese'), id: 1, locale: 'pt-BR', active: false },
    ]);

    const t = useCallback(
        (scope: i18n.Scope, options: i18n.TranslateOptions) => {
            return i18n.t(scope, { ...options, locale });
        },
        [locale]
    );

    // get local from storage
    const getLocale = useCallback(async () => {
        const localeJSON = await Storage.getItem('locale');
        const localeToSet = localeJSON !== null ? localeJSON : Localization.locale;
        setLocale(localeToSet);
        setLanguages(
            languages.map((l) => {
                return { ...l, active: l.locale === localeToSet };
            })
        );
    }, [setLocale]);

    useEffect(() => {
        getLocale();
    }, [getLocale]);

    useEffect(() => {
        Storage.setItem('locale', locale);
        i18n.locale = locale;
        setLanguages(
            languages.map((l) => {
                return { ...l, active: l.locale === locale };
            })
        );
    }, [locale]);

    const contextValue = {
        t,
        i18n,
        locale,
        setLocale,
        translate: t,
        languages,
    };

    return (
        <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext) as ITranslate;
