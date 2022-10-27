import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { Spinner } from '../components';
import { TranlationProvider, ThemeProvider, useData } from '../hooks';

import { PublicNavigator } from './publicNavigator';
import { RootNavigator } from './rootNavigator';

export default function Navigation() {
    const { isDark, isLoading, theme, setTheme, /*user*/ } = useData();
    const user = true;

    /* set the status bar based on isDark constant */
    useEffect(() => {
        Platform.OS === 'android' && StatusBar.setTranslucent(true);
        StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
        return () => {
            StatusBar.setBarStyle('default');
        };
    }, [isDark]);

    const [fontsLoaded] = useFonts({
        'OpenSans-Light': theme.assets.OpenSansLight,
        'OpenSans-Regular': theme.assets.OpenSansRegular,
        'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
        'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
        'OpenSans-Bold': theme.assets.OpenSansBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const navigationTheme = {
        ...DefaultTheme,
        dark: isDark,
        colors: {
            ...DefaultTheme.colors,
            border: 'rgba(0,0,0,0)',
            text: String(theme.colors.text),
            card: String(theme.colors.card),
            primary: String(theme.colors.primary),
            notification: String(theme.colors.primary),
            background: String(theme.colors.background),
        },
    };

    return (
        <TranlationProvider>
            <ThemeProvider theme={theme} setTheme={setTheme}>
                <NavigationContainer theme={navigationTheme}>
                    {user ? <RootNavigator /> : <PublicNavigator />}
                    <Spinner isLoading={isLoading} />
                </NavigationContainer>
            </ThemeProvider>
        </TranlationProvider>
    );
}
