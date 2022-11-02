import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { TabBarIcon } from './tabBarIcon';
import { useTheme, useTranslation } from '../hooks';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { PlansNavigator } from './plansNavigator';
import { EventsNavigator } from './eventsNavigator';
import { TrainingSessionNavigator } from './trainigSessionNavigator';
import { BottomTabNavigatorParamList } from './types';

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

export function BottomTabNavigator() {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <BottomTab.Navigator
            initialRouteName="Plans"
            screenOptions={{
                tabBarActiveTintColor: String(colors.primary),
                headerTitle: '',
                headerShown: false,
                unmountOnBlur: true,
            }}
        >
            <BottomTab.Screen
                name="Events"
                component={EventsNavigator}
                options={{
                    title: t('app.menubar.events'),
                    tabBarIcon: ({ color }) => <TabBarIcon name="map-o" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Progress"
                component={ProgressScreen}
                options={{
                    title: t('app.menubar.progress'),
                    tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Plans"
                component={PlansNavigator}
                options={{
                    title: t('app.menubar.plans'),
                    tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Training"
                component={TrainingSessionNavigator}
                options={{
                    title: t('app.menubar.training'),
                    tabBarIcon: ({ color }) => <TabBarIcon name="bicycle" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: t('app.menubar.profile'),
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}
