import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RestRoutineScreen from '../screens/TrainingSession/RestRoutineScreen';
import TrainingDetailScreen from '../screens/TrainingSession/TrainingDetailScreen';
import TrainingSessionScreen from '../screens/TrainingSession/TrainingSesionScreen';
import TrainingWatcher from '../screens/TrainingSession/TrainingWatcher';
import { TrainingSessionStackNavigatorParamList } from './types/trainingSessionStackNavigatorParamList';

const Stack = createNativeStackNavigator<TrainingSessionStackNavigatorParamList>();

export function TrainingSessionNavigator() {
    const navigation = useNavigation();
    const route = useRoute();
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'TrainingWatcher') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRouteName="TrainingSessionScreen"
            screenOptions={{ headerTitle: '' }}
        >
            <Stack.Screen name="TrainingSessionScreen" component={TrainingSessionScreen} />
            <Stack.Screen name="TrainingDetailScreen" component={TrainingDetailScreen} />
            <Stack.Screen
                name="TrainingWatcher"
                component={TrainingWatcher}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="RestRoutineScreen" component={RestRoutineScreen} />
        </Stack.Navigator>
    );
}
