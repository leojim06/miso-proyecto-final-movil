import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainingDetailScreen from '../screens/TrainingSession/TrainingDetailScreen';
import TrainingSessionScreen from '../screens/TrainingSession/TrainingSesionScreen';
import TrainingWatcher from '../screens/TrainingSession/TrainingWatcher';
import { TrainingSessionStackNavigatorParamList } from './types/trainingSessionStackNavigatorParamList';

const Stack = createNativeStackNavigator<TrainingSessionStackNavigatorParamList>();

export function TrainingSessionNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="TrainingSessionScreen"
            screenOptions={{ headerTitle: '' }}
        >
            <Stack.Screen name="TrainingSessionScreen" component={TrainingSessionScreen} />
            <Stack.Screen name="TrainingDetailScreen" component={TrainingDetailScreen} />
            <Stack.Screen name="TrainingWatcher" component={TrainingWatcher} />
        </Stack.Navigator>
    );
}
