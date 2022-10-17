import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { PublicNavigator } from './PublicNavigator';
import { RootNavigator } from './RootNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  let isLoggedIn: boolean = false;

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {
        isLoggedIn
          ? <RootNavigator />
          : <PublicNavigator />
      }
    </NavigationContainer>
  );
}
