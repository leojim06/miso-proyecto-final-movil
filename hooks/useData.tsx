import React, { useCallback, useContext, useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';

import { ITheme, IUseData, IUser } from '../constants/types';
import { light } from '../constants';
import { ITrainingSessionProps } from '../screens/TrainingSession/TrainingSesion';
import { ISuscription, ITrainingLevel } from '../services/api/useCatalogEndpoint';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const [theme, setTheme] = useState<ITheme>(light);
    const [user, setUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(false);
    const [isSensorActive, setIsSensorActive] = useState<boolean>(false);
    const [trainingSession, setTrainingSession] = useState<ITrainingSessionProps>();
    const [suscriptionCatalog, setSuscriptionCatalog] = useState<ISuscription[]>();
    const [trainingLevelCatalog, setTrainingLevelCatalog] = useState<ITrainingLevel[]>();

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

    // get isSensorActive from storage
    const getIsSensorActive = useCallback(async () => {
        const isSensorActiveJSON = await Storage.getItem('sensorActive');
        if (isSensorActiveJSON !== null) {
            setIsSensorActive(JSON.parse(isSensorActiveJSON));
        }
    }, [setIsSensorActive]);

    // handle activity of sensor
    const handleSensor = useCallback(
        (payload: boolean) => {
            setIsSensorActive(payload);
            Storage.setItem('sensorActive', JSON.stringify(payload));
        },
        [setIsSensorActive]
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

    // training session
    const getTrainingSession = useCallback(async () => {
        const myTrainingSession = await Storage.getItem('trainingSession');
        if (myTrainingSession !== null) {
            setTrainingSession(JSON.parse(myTrainingSession));
        }
    }, [setTrainingSession]);

    const handleTrainingSession = useCallback(
        async (payload: ITrainingSessionProps) => {
            if (payload === null || payload === undefined) {
                await Storage.removeItem('trainingSession');
            } else {
                await Storage.setItem('trainingSession', JSON.stringify(payload));
            }
            setTrainingSession(payload);
        },
        [setTrainingSession]
    );

    // suscription catalog
    const getSuscriptionsCatalog = useCallback(async () => {
        const suscriptions = await Storage.getItem('suscriptions');
        if (suscriptions !== null) {
            setSuscriptionCatalog(JSON.parse(suscriptions));
        }
    }, [setSuscriptionCatalog]);

    const handleSuscriptionCatalog = useCallback(
        async (payload: ISuscription[]) => {
            if (payload === null || payload === undefined) {
                await Storage.removeItem('suscriptions');
            } else {
                await Storage.setItem('suscriptions', JSON.stringify(payload));
            }
            setSuscriptionCatalog(payload);
        },
        [setSuscriptionCatalog]
    );

    // training level catalog
    const getTrainingLevelCatalog = useCallback(async () => {
        const trainingLevels = await Storage.getItem('trainingLevels');
        if (trainingLevels !== null) {
            setTrainingLevelCatalog(JSON.parse(trainingLevels));
        }
    }, [setTrainingLevelCatalog]);

    const handleTrainingLevelCatalog = useCallback(
        async (payload: ITrainingLevel[]) => {
            if (payload === null || payload === undefined) {
                await Storage.removeItem('trainingLevels');
            } else {
                await Storage.setItem('trainingLevels', JSON.stringify(payload));
            }
            setTrainingLevelCatalog(payload);
        },
        [setTrainingLevelCatalog]
    );

    // get initial data for: isDark & language
    useEffect(() => {
        getIsDark();
    }, [getIsDark]);

    // get initial status for sensor
    useEffect(() => {
        getIsSensorActive();
    }, [getIsSensorActive]);

    // change theme based on isDark updates
    useEffect(() => {
        setTheme(isDark ? light : light);
    }, [isDark]);

    // get initial data for training session
    useEffect(() => {
        getTrainingSession();
    }, [getTrainingSession]);

    // get initial data for suscription catalog
    useEffect(() => {
        getSuscriptionsCatalog();
    }, [getSuscriptionsCatalog]);

    // get initial data for trainig level catalog
    useEffect(() => {
        getTrainingLevelCatalog();
    }, [getTrainingLevelCatalog]);

    const contextValue = {
        isDark,
        handleIsDark,
        theme,
        setTheme,
        user,
        handleUser,
        isLoading,
        handleLoading,
        trainingSession,
        handleTrainingSession,
        suscriptionCatalog,
        handleSuscriptionCatalog,
        trainingLevelCatalog,
        handleTrainingLevelCatalog,
        isSensorActive,
        handleSensor
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext) as IUseData;
