import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EventDetailScreen from '../screens/Events/EventDetailScreen';
import EventsScreen from '../screens/Events/EventsScreen';

const Stack = createNativeStackNavigator();

export function EventsNavigator() {
    return(
        <Stack.Navigator initialRouteName='EventsScreen' screenOptions={{headerTitle: ''}}>
            <Stack.Screen name='EventsScreen' component={EventsScreen} />
            <Stack.Screen name='EventDetailScreen' component={EventDetailScreen} />
        </Stack.Navigator>
    )
}