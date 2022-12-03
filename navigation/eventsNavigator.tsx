import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailScreen from '../screens/Events/EventDetailScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import { EventStackNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<EventStackNavigatorParamList>();

export function EventsNavigator() {
    return (
        <Stack.Navigator initialRouteName="EventsScreen" screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name="EventsScreen" component={EventsScreen} />
            <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
        </Stack.Navigator>
    );
}
