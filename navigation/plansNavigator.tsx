import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanDetailScreen from '../screens/Plans/PlanDetailScreen';
import PlansScreen from '../screens/Plans/PlansScreen';

const Stack = createNativeStackNavigator();

export function PlansNavigator() {
    return (
        <Stack.Navigator initialRouteName="PlansScreen" screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name="PlansScreen" component={PlansScreen} />
            <Stack.Screen name="PlanDetailScreen" component={PlanDetailScreen} />
        </Stack.Navigator>
    );
}
