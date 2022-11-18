import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgressEventDetailScreen from '../screens/ProgressEvent/ProgressEventDetailScreen';
import ProgressEventScreen from '../screens/ProgressEvent/ProgressEventScreen';
import SportProfileScreen from '../screens/ProgressEvent/SportProfileScreen';
import { ProgressEventStackNavigatorParamList } from './types/progressEventStackNavigatorParamList';

const Stack = createNativeStackNavigator<ProgressEventStackNavigatorParamList>();

export function ProgressEventNavigator() {
    return (
        <Stack.Navigator initialRouteName="ProgressEventScreen" screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name="ProgressEventScreen" component={ProgressEventScreen} />
            <Stack.Screen name="ProgressEventDetailScreen" component={ProgressEventDetailScreen} />
            <Stack.Screen name="SportProfileScreen" component={SportProfileScreen} />
        </Stack.Navigator>
    );
}
