import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { ProfileStackNavigatorParamList } from './types/ProfileStackNavigatorParamList';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

export function ProfileNavigator() {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
}
