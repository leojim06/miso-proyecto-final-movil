import React, { useCallback, useContext, useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';

import { ITheme, IUseData, IUser } from '../constants/types';
import { light } from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const [theme, setTheme] = useState<ITheme>(light);
    const [user, setUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(false);

    // get isDark mode from storage
    const getIsDark = useCallback(async () => {
        const isDarkJSON = await Storage.getItem('isDark');
        if (isDarkJSON !== null) {
            setIsDark(JSON.parse(isDarkJSON));
        }
    }, [setIsDark]);

    // handle isDark mode
    const handleIsDark = useCallback(
        (payload: boolean) => {
            setIsDark(payload);
            Storage.setItem('isDark', JSON.stringify(payload));
        },
        [setIsDark]
    );

    // handle user
    const handleUser = useCallback(
        (payload: any) => {
            if (JSON.stringify(payload) !== JSON.stringify(user)) {
                setUser(payload);
            }
        },
        [user, setUser]
    );

    // handle isLoading
    const handleLoading = useCallback(
        (payload: boolean) => {
            setIsLoading(payload);
        },
        [setIsLoading]
    );

    // get initial data for: isDark & language
    useEffect(() => {
        getIsDark();
    }, [getIsDark]);

    // change theme based on isDark updates
    useEffect(() => {
        setTheme(isDark ? light : light);
    }, [isDark]);

    const contextValue = {
        isDark,
        handleIsDark,
        theme,
        setTheme,
        user,
        handleUser,
        isLoading,
        handleLoading,
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext) as IUseData;
