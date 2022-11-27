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

    let languages: ILanguageProps[] = [
        { label: i18n.t('profile.label.spanish'), id: 0, locale: 'es', active: false },
        { label: i18n.t('profile.label.portuguese'), id: 1, locale: 'ptBR', active: false },
    ];

    const t = useCallback(
        (scope: i18n.Scope, options: i18n.TranslateOptions) => {
            return i18n.t(scope, { ...options, locale });
        },
        [locale]
    );

    // get local from storage
    const getLocale = useCallback(async () => {
        const localeJSON = await Storage.getItem('locale');
        setLocale(localeJSON !== null ? localeJSON : Localization.locale);
        languages = Object.assign(
            {},
            {
                ...languages.map((l) => {
                    if (l.locale === localeJSON) l.active = true;
                    return l;
                }),
            }
        );
    }, [setLocale]);

    useEffect(() => {
        getLocale();
    }, [getLocale]);

    useEffect(() => {
        Storage.setItem('locale', locale);
        i18n.locale = locale;
        languages = Object.assign(
            {},
            {
                ...languages.map((l) => {
                    console.info('locale: ', locale);
                    if (l.locale === locale) l.active = true;
                    return l;
                }),
            }
        );
        console.log('locale: ', locale);
        console.log('change locale: ', JSON.stringify(languages, null, 4));
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
