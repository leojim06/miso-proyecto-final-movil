import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export function PublicNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
