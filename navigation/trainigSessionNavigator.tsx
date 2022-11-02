import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrainingSessionScreen from '../screens/TrainingSession/TrainingSesionScreen';
import { TrainingSessionStackNavigatorParamList } from './types/trainingSessionStackNavigatorParamList';

const Stack = createNativeStackNavigator<TrainingSessionStackNavigatorParamList>();

export function TrainingSessionNavigator(){
    return(
        <Stack.Navigator initialRouteName='TrainingSessionScreen' screenOptions={{headerTitle:''}}>
            <Stack.Screen name='TrainingSessionScreen' component={TrainingSessionScreen} />
        </Stack.Navigator>
    )
}
