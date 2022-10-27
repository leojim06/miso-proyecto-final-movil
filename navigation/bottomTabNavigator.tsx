import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Pressable } from 'react-native';

import { RootTabParamList, RootTabScreenProps } from '../types';
import { TabBarIcon } from './tabBarIcon';
import { useTheme, useTranslation } from '../hooks';
import EventsScreen from '../screens/EventsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import PlansScreen from '../screens/PlansScreen';
import TrainingScreen from '../screens/TrainingScreen';
import ProfileScreen from '../screens/ProfileScreen';

// const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomTab = createBottomTabNavigator();


export function BottomTabNavigator() {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <BottomTab.Navigator
            initialRouteName="PlansScreen"
            screenOptions={{
                tabBarActiveTintColor: String(colors.primary),
                headerTitle: ""
            }}
        >
            <BottomTab.Screen
                name="EventsScreen"
                component={EventsScreen}
                // options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
                options={{
                    title: t('app.menubar.events'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="ProgressScreen"
                component={ProgressScreen}
                options={{
                    title: t('app.menubar.progress'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="PlansScreen"
                component={PlansScreen}
                options={{
                    title: t('app.menubar.plans'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="TrainingScreen"
                component={TrainingScreen}
                options={{
                    title: t('app.menubar.training'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: t('app.menubar.profile'),
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}
